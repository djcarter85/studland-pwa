using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile(@"C:\a\studland\config.json", optional: true, reloadOnChange: true);
builder.Services.AddHttpClient();
builder.Services.AddCors();

var app = builder.Build();

app.UseHttpsRedirection();

TimeSpan GetDelay(IConfiguration configuration)
{
    var configValue = configuration["delayMilliseconds"];

    if (configValue == null)
    {
        return TimeSpan.Zero;
    }
    else
    {
        return TimeSpan.FromMilliseconds(int.Parse(configValue));
    }
}

string? GetError(IConfiguration configuration) => configuration["errorMessage"];

async Task<IResult> GetAsync(HttpClient httpClient, IConfiguration configuration, string? path)
{
    var fetchTask = httpClient.GetAsync($"https://raw.githubusercontent.com/{path}");
    await Task.Delay(GetDelay(configuration));

    var error = GetError(configuration);

    if (!string.IsNullOrEmpty(error))
    {
        return Results.BadRequest(error);
    }
    else
    {
        var responseMessage = await fetchTask;
        var stream = await responseMessage.Content.ReadAsStreamAsync();
        return Results.Stream(stream, contentType: "application/json");
    }
}

app.UseCors(x =>
{
    x.AllowAnyHeader();
    x.AllowAnyMethod();
    x.AllowAnyOrigin();
});

app.MapGet("/{*path}",
    async (string? path, [FromServices] HttpClient httpClient, [FromServices] IConfiguration configuration) =>
        await GetAsync(httpClient, configuration, path));

app.Run();
