using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient();
builder.Services.AddCors();

var app = builder.Build();

app.UseHttpsRedirection();

async Task<TimeSpan> GetDelayAsync()
{
    try
    {
        var fileText = await File.ReadAllTextAsync(@"C:\a\studland\delay.txt");
        var delay = TimeSpan.FromMilliseconds(int.Parse(fileText));
        return delay;
    }
    catch
    {
        return TimeSpan.Zero;
    }
}

async Task<string> GetAsync(HttpClient httpClient, string? path)
{
    var fetchTask = httpClient.GetAsync($"https://raw.githubusercontent.com/{path}");
    await Task.Delay(await GetDelayAsync());
    var responseMessage = await fetchTask;
    return await responseMessage.Content.ReadAsStringAsync();
}

app.UseCors(x =>
{
    x.AllowAnyHeader();
    x.AllowAnyMethod();
    x.AllowAnyOrigin();
});

app.MapGet("/{*path}", async (string? path, [FromServices] HttpClient httpClient) => await GetAsync(httpClient, path));

app.Run();
