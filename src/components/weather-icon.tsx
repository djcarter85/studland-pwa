import { ReactNode } from "react";

const classMoon = "text-gray-700 dark:text-gray-200";
const classSun = "text-yellow-500 dark:text-yellow-400";
const classCloudLight = "text-gray-400 dark:text-gray-200";
const classCloudThick = "text-gray-800 dark:text-gray-200";
const classRain = "text-sky-600 dark:text-sky-500";
const classSnow = "text-gray-400 dark:text-gray-200";
const classHail = "text-gray-400 dark:text-gray-200";
const classLightning = "text-gray-800 dark:text-gray-200";

// All icons in this file are taken from Bootstrap Icons, with paths converted
// from relative to absolute. Source icons match the name, except where
// otherwise noted.
function Moon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-moon"
      viewBox="0 0 16 16"
    >
      <path
        className={classMoon}
        d="M 6 0.278 A 0.77 0.77 0 0 1 6.08 1.136 A 7.2 7.2 0 0 0 5.202 4.596 C 5.202 8.617 8.48 11.873 12.52 11.873 Q 13.312 11.872 14.053 11.713 A 0.79 0.79 0 0 1 14.863 12.029 A 0.73 0.73 0 0 1 14.832 12.922 A 8.35 8.35 0 0 1 8.344 16 C 3.734 16 0 12.286 0 7.71 C 0 4.266 2.114 1.312 5.124 0.06 A 0.75 0.75 0 0 1 6 0.278 M 4.858 1.311 A 7.27 7.27 0 0 0 1.025 7.71 C 1.025 11.73 4.304 14.986 8.344 14.986 A 7.32 7.32 0 0 0 13.549 12.824 Q 13.043 12.887 12.52 12.887 C 7.91 12.887 4.177 9.173 4.177 4.597 C 4.177 3.43 4.419 2.319 4.858 1.311"
      />
    </svg>
  );
}

function Sun() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-sun"
      viewBox="0 0 16 16"
    >
      <path
        className={classSun}
        d="M 8 11 A 3 3 0 1 1 8 5 A 3 3 0 0 1 8 11 M 8 12 A 4 4 0 1 0 8 4 A 4 4 0 0 0 8 12 M 8 0 A 0.5 0.5 0 0 1 8.5 0.5 V 2.5 A 0.5 0.5 0 0 1 7.5 2.5 V 0.5 A 0.5 0.5 0 0 1 8 0 M 8 13 A 0.5 0.5 0 0 1 8.5 13.5 V 15.5 A 0.5 0.5 0 0 1 7.5 15.5 V 13.5 A 0.5 0.5 0 0 1 8 13 M 16 8 A 0.5 0.5 0 0 1 15.5 8.5 H 13.5 A 0.5 0.5 0 0 1 13.5 7.5 H 15.5 A 0.5 0.5 0 0 1 16 8 M 3 8 A 0.5 0.5 0 0 1 2.5 8.5 H 0.5 A 0.5 0.5 0 0 1 0.5 7.5 H 2.5 A 0.5 0.5 0 0 1 3 8 M 13.657 2.343 A 0.5 0.5 0 0 1 13.657 3.05 L 12.243 4.465 A 0.5 0.5 0 1 1 11.536 3.757 L 12.95 2.343 A 0.5 0.5 0 0 1 13.657 2.343 M 4.464 11.536 A 0.5 0.5 0 0 1 4.464 12.243 L 3.05 13.657 A 0.5 0.5 0 0 1 2.343 12.95 L 3.757 11.536 A 0.5 0.5 0 0 1 4.464 11.536 M 13.657 13.657 A 0.5 0.5 0 0 1 12.95 13.657 L 11.536 12.243 A 0.5 0.5 0 0 1 12.243 11.536 L 13.657 12.95 A 0.5 0.5 0 0 1 13.657 13.657 M 4.464 4.465 A 0.5 0.5 0 0 1 3.757 4.465 L 2.343 3.05 A 0.5 0.5 0 1 1 3.05 2.343 L 4.464 3.757 A 0.5 0.5 0 0 1 4.464 4.465"
      />
    </svg>
  );
}

function CloudMoon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-cloud-moon"
      viewBox="0 0 16 16"
    >
      <path
        className={classCloudLight}
        d="M 7 8 A 3.5 3.5 0 0 1 10.5 11.555 A 0.5 0.5 0 0 0 11.125 12.047 A 1.503 1.503 0 0 1 13 13.5 A 1.5 1.5 0 0 1 11.5 15 H 3 A 2 2 0 1 1 3.1 11.002 A 0.5 0.5 0 0 0 3.609 10.627 A 3.5 3.5 0 0 1 7 8 M 11.473 11 A 4.5 4.5 0 0 0 2.753 10.01 A 3 3 0 0 0 3 16 H 11.5 A 2.5 2.5 0 0 0 11.5 11 Z"
      />
      <path
        className={classMoon}
        d="M 11.286 1.778 A 0.5 0.5 0 0 0 10.721 1.023 A 4.595 4.595 0 0 0 7.541 6.026 A 5.5 5.5 0 0 1 8.596 6.235 A 3.6 3.6 0 0 1 9.83 2.617 A 4.593 4.593 0 0 0 14.14 8.361 A 3.58 3.58 0 0 1 11.899 8.995 Q 12.143 9.472 12.293 9.995 A 4.59 4.59 0 0 0 15.917 7.955 A 0.5 0.5 0 0 0 15.352 7.2 A 3.593 3.593 0 0 1 11.287 1.778 Z"
      />
    </svg>
  );
}

function CloudSun() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-cloud-sun"
      viewBox="0 0 16 16"
    >
      <path
        className={classCloudLight}
        d="M 7 8 A 3.5 3.5 0 0 1 10.5 11.555 A 0.5 0.5 0 0 0 11.124 12.047 A 1.503 1.503 0 0 1 13 13.5 A 1.5 1.5 0 0 1 11.5 15 H 3 A 2 2 0 1 1 3.1 11.002 A 0.5 0.5 0 0 0 3.61 10.627 A 3.5 3.5 0 0 1 7 8 M 11.473 11 A 4.5 4.5 0 0 0 2.753 10.01 A 3 3 0 0 0 3 16 H 11.5 A 2.5 2.5 0 0 0 11.5 11 Z"
      />
      <path
        className={classSun}
        d="M 10.5 1.5 A 0.5 0.5 0 0 0 9.5 1.5 V 2.5 A 0.5 0.5 0 0 0 10.5 2.5 Z M 14.243 3.464 A 0.5 0.5 0 1 0 13.536 2.757 L 12.828 3.464 A 0.5 0.5 0 0 0 13.536 4.172 Z M 6.464 2.757 A 0.5 0.5 0 0 0 5.757 3.464 L 6.464 4.172 A 0.5 0.5 0 1 0 7.172 3.464 Z M 8.198 6.131 A 2 2 0 1 1 11.494 8.329 Q 11.794 8.752 12.01 9.227 A 3 3 0 1 0 7.17 6.002 Q 7.699 6.019 8.198 6.131 M 12.682 10.205 C 13.282 10.42 13.807 10.795 14.204 11.277 A 0.5 0.5 0 0 0 14.243 10.535 L 13.536 9.828 A 0.5 0.5 0 0 0 12.682 10.205 M 14.5 6.5 A 0.5 0.5 0 0 0 14.5 7.5 H 15.5 A 0.5 0.5 0 0 0 15.5 6.5 Z"
      />
    </svg>
  );
}

function Hurricane() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-hurricane"
      viewBox="0 0 16 16"
    >
      <path d="M 6.999 2.6 A 5.5 5.5 0 0 1 15 7.5 A 0.5 0.5 0 0 0 16 7.5 A 6.5 6.5 0 1 0 3 7.5 A 5 5 0 0 0 9.001 12.4 A 5.5 5.5 0 0 1 1 7.5 A 0.5 0.5 0 0 0 0 7.5 A 6.5 6.5 0 1 0 13 7.5 A 5 5 0 0 0 6.999 2.6 M 10 7.5 A 2 2 0 1 1 6 7.5 A 2 2 0 0 1 10 7.5" />
    </svg>
  );
}

function CloudFog() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-cloud-fog"
      viewBox="0 0 16 16"
    >
      <path
        className={classCloudLight}
        d="M 3 13.5 A 0.5 0.5 0 0 1 3.5 13 H 12.5 A 0.5 0.5 0 0 1 12.5 14 H 3.5 A 0.5 0.5 0 0 1 3 13.5 M 3 15.5 A 0.5 0.5 0 0 1 3.5 15 H 12.5 A 0.5 0.5 0 0 1 12.5 16 H 3.5 A 0.5 0.5 0 0 1 3 15.5 M 13.405 6.027 A 5.001 5.001 0 0 0 3.906 5.023 A 3.5 3.5 0 1 0 3.5 12 H 13 A 3 3 0 0 0 13.405 6.027 M 8.5 3 A 4 4 0 0 1 12.476 6.555 A 0.5 0.5 0 0 0 12.976 7 H 13 A 2 2 0 0 1 13 11 H 3.5 A 2.5 2.5 0 1 1 4.105 6.074 A 0.5 0.5 0 0 0 4.701 5.745 A 4 4 0 0 1 8.5 3"
      />
    </svg>
  );
}

function CloudLight() {
  // Source icon: `cloud`
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-cloud"
      viewBox="0 0 16 16"
    >
      <path
        className={classCloudLight}
        d="M 4.406 3.342 A 5.53 5.53 0 0 1 8 2 C 10.69 2 12.923 4 13.166 6.579 C 14.758 6.804 16 8.137 16 9.773 C 16 11.569 14.502 13 12.687 13 H 3.781 C 1.708 13 0 11.366 0 9.318 C 0 7.555 1.266 6.095 2.942 5.725 C 3.085 4.862 3.64 4.002 4.406 3.342 M 5.059 4.099 C 4.302 4.752 3.906 5.539 3.906 6.155 V 6.603 L 3.461 6.652 C 2.064 6.805 1 7.952 1 9.318 C 1 10.785 2.23 12 3.781 12 H 12.687 C 13.98 12 15 10.988 15 9.773 C 15 8.557 13.98 7.545 12.687 7.545 H 12.187 V 7.045 C 12.188 4.825 10.328 3 8 3 A 4.53 4.53 0 0 0 5.059 4.1 Z"
      />
    </svg>
  );
}

function CloudThick() {
  // Source icon: `cloud`
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-cloud"
      viewBox="0 0 16 16"
    >
      <path
        className={classCloudThick}
        d="M 4.406 3.342 A 5.53 5.53 0 0 1 8 2 C 10.69 2 12.923 4 13.166 6.579 C 14.758 6.804 16 8.137 16 9.773 C 16 11.569 14.502 13 12.687 13 H 3.781 C 1.708 13 0 11.366 0 9.318 C 0 7.555 1.266 6.095 2.942 5.725 C 3.085 4.862 3.64 4.002 4.406 3.342 M 5.059 4.099 C 4.302 4.752 3.906 5.539 3.906 6.155 V 6.603 L 3.461 6.652 C 2.064 6.805 1 7.952 1 9.318 C 1 10.785 2.23 12 3.781 12 H 12.687 C 13.98 12 15 10.988 15 9.773 C 15 8.557 13.98 7.545 12.687 7.545 H 12.187 V 7.045 C 12.188 4.825 10.328 3 8 3 A 4.53 4.53 0 0 0 5.059 4.1 Z"
      />
    </svg>
  );
}

function CloudRain() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-cloud-rain"
      viewBox="0 0 16 16"
    >
      <path
        className={classRain}
        d="M 4.158 12.025 A 0.5 0.5 0 0 1 4.474 12.658 L 3.974 14.158 A 0.5 0.5 0 0 1 3.026 13.842 L 3.526 12.342 A 0.5 0.5 0 0 1 4.158 12.025 M 7.158 12.025 A 0.5 0.5 0 0 1 7.474 12.658 L 6.474 15.658 A 0.5 0.5 0 0 1 5.526 15.342 L 6.526 12.342 A 0.5 0.5 0 0 1 7.158 12.025 M 10.158 12.025 A 0.5 0.5 0 0 1 10.474 12.658 L 9.974 14.158 A 0.5 0.5 0 0 1 9.026 13.842 L 9.526 12.342 A 0.5 0.5 0 0 1 10.158 12.025 M 13.158 12.025 A 0.5 0.5 0 0 1 13.474 12.658 L 12.474 15.658 A 0.5 0.5 0 1 1 11.526 15.342 L 12.526 12.342 A 0.5 0.5 0 0 1 13.158 12.025"
      />
      <path
        className={classCloudThick}
        d="M 13.405 5.027 A 5.001 5.001 0 0 0 3.906 4.023 A 3.5 3.5 0 1 0 3.5 11 H 13 A 3 3 0 0 0 13.405 5.027 M 8.5 2 A 4 4 0 0 1 12.476 5.555 A 0.5 0.5 0 0 0 12.976 6 H 13 A 2 2 0 0 1 13 10 H 3.5 A 2.5 2.5 0 1 1 4.105 5.074 A 0.5 0.5 0 0 0 4.701 4.745 A 4 4 0 0 1 8.5 2"
      />
    </svg>
  );
}

function CloudDrizzle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-cloud-drizzle"
      viewBox="0 0 16 16"
    >
      <path
        className={classRain}
        d="M 4.158 12.025 A 0.5 0.5 0 0 1 4.474 12.658 L 3.974 14.158 A 0.5 0.5 0 0 1 3.026 13.842 L 3.526 12.342 A 0.5 0.5 0 0 1 4.158 12.025 M 10.158 12.025 A 0.5 0.5 0 0 1 10.474 12.658 L 9.974 14.158 A 0.5 0.5 0 0 1 9.026 13.842 L 9.526 12.342 A 0.5 0.5 0 0 1 10.158 12.025 M 6.658 13.525 A 0.5 0.5 0 0 1 6.974 14.158 L 6.474 15.658 A 0.5 0.5 0 0 1 5.526 15.342 L 6.026 13.842 A 0.5 0.5 0 0 1 6.658 13.525 M 12.658 13.525 A 0.5 0.5 0 0 1 12.974 14.158 L 12.474 15.658 A 0.5 0.5 0 1 1 11.526 15.342 L 12.026 13.842 A 0.5 0.5 0 0 1 12.658 13.525"
      />
      <path
        className={classCloudThick}
        d="M 13.405 5.027 A 5.001 5.001 0 0 0 3.906 4.023 A 3.5 3.5 0 1 0 3.5 11 H 13 A 3 3 0 0 0 13.405 5.027 M 8.5 2 A 4 4 0 0 1 12.476 5.555 A 0.5 0.5 0 0 0 12.976 6 H 13 A 2 2 0 0 1 13 10 H 3.5 A 2.5 2.5 0 1 1 4.105 5.074 A 0.5 0.5 0 0 0 4.701 4.745 A 4 4 0 0 1 8.5 2"
      />
    </svg>
  );
}

function CloudRainHeavy() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-cloud-rain-heavy"
      viewBox="0 0 16 16"
    >
      <path
        className={classRain}
        d="M 4.176 11.032 A 0.5 0.5 0 0 1 4.468 11.675 L 2.968 15.675 A 0.5 0.5 0 1 1 2.032 15.325 L 3.532 11.325 A 0.5 0.5 0 0 1 4.176 11.032 M 7.176 11.032 A 0.5 0.5 0 0 1 7.468 11.675 L 5.968 15.675 A 0.5 0.5 0 1 1 5.032 15.325 L 6.532 11.325 A 0.5 0.5 0 0 1 7.176 11.032 M 10.176 11.032 A 0.5 0.5 0 0 1 10.468 11.675 L 8.968 15.675 A 0.5 0.5 0 1 1 8.032 15.325 L 9.532 11.325 A 0.5 0.5 0 0 1 10.176 11.032 M 13.176 11.032 A 0.5 0.5 0 0 1 13.468 11.675 L 11.968 15.675 A 0.5 0.5 0 0 1 11.032 15.325 L 12.532 11.325 A 0.5 0.5 0 0 1 13.176 11.032"
      />
      <path
        className={classCloudThick}
        d="M 13.405 4.027 A 5.001 5.001 0 0 0 3.906 3.023 A 3.5 3.5 0 1 0 3.5 10 H 13 A 3 3 0 0 0 13.405 4.027 M 8.5 1 A 4 4 0 0 1 12.476 4.555 A 0.5 0.5 0 0 0 12.976 5 H 13 A 2 2 0 0 1 13 9 H 3.5 A 2.5 2.5 0 1 1 4.105 4.074 A 0.5 0.5 0 0 0 4.701 3.745 A 4 4 0 0 1 8.5 1"
      />
    </svg>
  );
}

function CloudSleet() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-cloud-sleet"
      viewBox="0 0 16 16"
    >
      <path
        className={classCloudThick}
        d="M 13.405 4.027 A 5.001 5.001 0 0 0 3.906 3.023 A 3.5 3.5 0 1 0 3.5 10 H 13 A 3 3 0 0 0 13.405 4.027 M 8.5 1 A 4 4 0 0 1 12.476 4.555 A 0.5 0.5 0 0 0 12.976 5 H 13 A 2 2 0 0 1 13 9 H 3.5 A 2.5 2.5 0 1 1 4.105 4.074 A 0.5 0.5 0 0 0 4.701 3.745 A 4 4 0 0 1 8.5 1"
      />
      <path
        className={classRain}
        d="M 4.224 11.053 A 0.5 0.5 0 0 1 4.447 11.723 L 3.947 12.723 A 0.5 0.5 0 1 1 3.053 12.276 L 3.553 11.276 A 0.5 0.5 0 0 1 4.223 11.053 Z M 8.224 11.053 A 0.5 0.5 0 0 1 8.447 11.723 L 7.947 12.723 A 0.5 0.5 0 1 1 7.053 12.276 L 7.553 11.276 A 0.5 0.5 0 0 1 8.223 11.053 Z M 12.224 11.053 A 0.5 0.5 0 0 1 12.447 11.723 L 11.947 12.723 A 0.5 0.5 0 1 1 11.053 12.276 L 11.553 11.276 A 0.5 0.5 0 0 1 12.223 11.053 Z"
      />
      <path
        className={classSnow}
        d="M 2.375 13.5 A 0.25 0.25 0 0 1 2.625 13.75 V 14.32 L 3.126 14.033 A 0.25 0.25 0 0 1 3.374 14.467 L 2.879 14.75 L 3.374 15.033 A 0.25 0.25 0 0 1 3.126 15.467 L 2.625 15.181 V 15.75 A 0.25 0.25 0 1 1 2.125 15.75 V 15.18 L 1.624 15.467 A 0.25 0.25 0 0 1 1.376 15.033 L 1.871 14.75 L 1.376 14.467 A 0.25 0.25 0 0 1 1.624 14.033 L 2.125 14.319 V 13.75 A 0.25 0.25 0 0 1 2.375 13.5 M 6.375 13.5 A 0.25 0.25 0 0 1 6.625 13.75 V 14.32 L 7.126 14.033 A 0.25 0.25 0 0 1 7.374 14.467 L 6.879 14.75 L 7.374 15.033 A 0.25 0.25 0 0 1 7.126 15.467 L 6.625 15.181 V 15.75 A 0.25 0.25 0 1 1 6.125 15.75 V 15.18 L 5.624 15.467 A 0.25 0.25 0 0 1 5.376 15.033 L 5.871 14.75 L 5.376 14.467 A 0.25 0.25 0 0 1 5.624 14.033 L 6.125 14.319 V 13.75 A 0.25 0.25 0 0 1 6.375 13.5 M 10.375 13.5 A 0.25 0.25 0 0 1 10.625 13.75 V 14.32 L 11.126 14.033 A 0.25 0.25 0 0 1 11.374 14.467 L 10.879 14.75 L 11.374 15.033 A 0.25 0.25 0 0 1 11.126 15.467 L 10.625 15.181 V 15.75 A 0.25 0.25 0 1 1 10.125 15.75 V 15.18 L 9.624 15.467 A 0.25 0.25 0 0 1 9.376 15.033 L 9.871 14.75 L 9.376 14.467 A 0.25 0.25 0 0 1 9.624 14.033 L 10.125 14.319 V 13.75 A 0.25 0.25 0 0 1 10.375 13.5"
      />
    </svg>
  );
}

function CloudHail() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-cloud-hail"
      viewBox="0 0 16 16"
    >
      <path
        className={classCloudThick}
        d="M 13.405 4.527 A 5.001 5.001 0 0 0 3.906 3.523 A 3.5 3.5 0 1 0 3.5 10.5 H 13 A 3 3 0 0 0 13.405 4.527 M 8.5 1.5 A 4 4 0 0 1 12.476 5.055 A 0.5 0.5 0 0 0 12.976 5.5 H 13 A 2 2 0 0 1 12.999 9.5 H 3.5 A 2.5 2.5 0 1 1 4.105 4.574 A 0.5 0.5 0 0 0 4.701 4.245 A 4 4 0 0 1 8.5 1.5"
      />
      <path
        className={classHail}
        d="M 3.75 15.25 A 0.75 0.75 0 1 1 2.25 15.25 A 0.75 0.75 0 0 1 3.75 15.25 M 7.75 15.25 A 0.75 0.75 0 1 1 6.25 15.25 A 0.75 0.75 0 0 1 7.75 15.25 M 11.75 15.25 A 0.75 0.75 0 1 1 10.25 15.25 A 0.75 0.75 0 0 1 11.75 15.25"
      />
      <path
        className={classRain}
        d="M 4.158 11.526 A 0.5 0.5 0 0 1 4.474 12.158 L 3.974 13.658 A 0.5 0.5 0 1 1 3.026 13.342 L 3.526 11.842 A 0.5 0.5 0 0 1 4.158 11.526 M 8.158 11.526 A 0.5 0.5 0 0 1 8.474 12.158 L 7.974 13.658 A 0.5 0.5 0 1 1 7.026 13.342 L 7.526 11.842 A 0.5 0.5 0 0 1 8.158 11.526 M 12.158 11.526 A 0.5 0.5 0 0 1 12.474 12.158 L 11.974 13.658 A 0.5 0.5 0 1 1 11.026 13.342 L 11.526 11.842 A 0.5 0.5 0 0 1 12.158 11.526"
      />
    </svg>
  );
}

function CloudSnow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-cloud-snow"
      viewBox="0 0 16 16"
    >
      <path
        className={classCloudThick}
        d="M 13.405 4.277 A 5.001 5.001 0 0 0 3.906 3.273 A 3.5 3.5 0 1 0 3.5 10.25 H 13 A 3 3 0 0 0 13.405 4.277 M 8.5 1.25 A 4 4 0 0 1 12.476 4.805 A 0.5 0.5 0 0 0 12.976 5.25 H 13 A 2 2 0 0 1 12.999 9.25 H 3.5 A 2.5 2.5 0 1 1 4.105 4.324 A 0.5 0.5 0 0 0 4.701 3.995 A 4 4 0 0 1 8.5 1.25"
      />
      <path
        className={classSnow}
        d="M 2.625 11.5 A 0.25 0.25 0 0 1 2.875 11.75 V 12.32 L 3.376 12.033 A 0.25 0.25 0 0 1 3.624 12.467 L 3.129 12.75 L 3.624 13.033 A 0.25 0.25 0 0 1 3.376 13.467 L 2.875 13.181 V 13.75 A 0.25 0.25 0 1 1 2.375 13.75 V 13.18 L 1.874 13.467 A 0.25 0.25 0 0 1 1.626 13.033 L 2.121 12.75 L 1.626 12.467 A 0.25 0.25 0 0 1 1.874 12.033 L 2.375 12.319 V 11.75 A 0.25 0.25 0 0 1 2.625 11.5 M 5.375 13.5 A 0.25 0.25 0 0 1 5.625 13.75 V 14.32 L 6.126 14.033 A 0.25 0.25 0 0 1 6.374 14.467 L 5.879 14.75 L 6.374 15.033 A 0.25 0.25 0 0 1 6.126 15.467 L 5.625 15.181 V 15.75 A 0.25 0.25 0 1 1 5.125 15.75 V 15.18 L 4.624 15.467 A 0.25 0.25 0 0 1 4.376 15.033 L 4.871 14.75 L 4.376 14.467 A 0.25 0.25 0 0 1 4.624 14.033 L 5.125 14.319 V 13.75 A 0.25 0.25 0 0 1 5.375 13.5 M 10.875 13.5 A 0.25 0.25 0 0 1 11.125 13.75 V 14.32 L 11.626 14.033 A 0.25 0.25 0 0 1 11.874 14.467 L 11.379 14.75 L 11.874 15.033 A 0.25 0.25 0 0 1 11.626 15.467 L 11.125 15.181 V 15.75 A 0.25 0.25 0 1 1 10.625 15.75 V 15.18 L 10.124 15.467 A 0.25 0.25 0 0 1 9.876 15.033 L 10.371 14.75 L 9.876 14.467 A 0.25 0.25 0 0 1 10.124 14.033 L 10.625 14.319 V 13.75 A 0.25 0.25 0 0 1 10.875 13.5 M 8.125 11.5 A 0.25 0.25 0 0 1 8.375 11.75 V 12.32 L 8.876 12.033 A 0.25 0.25 0 0 1 9.124 12.467 L 8.629 12.75 L 9.124 13.033 A 0.25 0.25 0 0 1 8.876 13.467 L 8.375 13.181 V 13.75 A 0.25 0.25 0 1 1 7.875 13.75 V 13.18 L 7.374 13.467 A 0.25 0.25 0 0 1 7.126 13.033 L 7.621 12.75 L 7.126 12.467 A 0.25 0.25 0 0 1 7.374 12.033 L 7.875 12.319 V 11.75 A 0.25 0.25 0 0 1 8.125 11.5 M 13.625 11.5 A 0.25 0.25 0 0 1 13.875 11.75 V 12.32 L 14.376 12.033 A 0.25 0.25 0 0 1 14.624 12.467 L 14.129 12.75 L 14.624 13.033 A 0.25 0.25 0 0 1 14.376 13.467 L 13.875 13.181 V 13.75 A 0.25 0.25 0 1 1 13.375 13.75 V 13.18 L 12.874 13.467 A 0.25 0.25 0 0 1 12.626 13.033 L 13.121 12.75 L 12.626 12.467 A 0.25 0.25 0 0 1 12.874 12.033 L 13.375 12.319 V 11.75 A 0.25 0.25 0 0 1 13.625 11.5"
      />
    </svg>
  );
}

function CloudLightningRain() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-cloud-lightning-rain"
      viewBox="0 0 16 16"
    >
      <path
        className={classRain}
        d="M 2.658 11.026 A 0.5 0.5 0 0 1 2.974 11.658 L 2.474 13.158 A 0.5 0.5 0 1 1 1.526 12.842 L 2.026 11.342 A 0.5 0.5 0 0 1 2.658 11.026 M 12.158 11.026 A 0.5 0.5 0 0 1 12.474 11.658 L 11.974 13.158 A 0.5 0.5 0 1 1 11.026 12.842 L 11.526 11.342 A 0.5 0.5 0 0 1 12.158 11.026 M 4.658 12.526 A 0.5 0.5 0 0 1 4.974 13.158 L 4.474 14.658 A 0.5 0.5 0 1 1 3.526 14.342 L 4.026 12.842 A 0.5 0.5 0 0 1 4.658 12.526 M 14.158 12.526 A 0.5 0.5 0 0 1 14.474 13.158 L 13.974 14.658 A 0.5 0.5 0 1 1 13.026 14.342 L 13.526 12.842 A 0.5 0.5 0 0 1 14.158 12.526"
      />
      <path
        className={classCloudThick}
        d="M 13.405 4.027 A 5.001 5.001 0 0 0 3.906 3.023 A 3.5 3.5 0 1 0 3.5 10 H 13 A 3 3 0 0 0 13.405 4.027 M 8.5 1 A 4 4 0 0 1 12.476 4.555 A 0.5 0.5 0 0 0 12.976 5 H 13 A 2 2 0 0 1 13 9 H 3.5 A 2.5 2.5 0 1 1 4.105 4.074 A 0.5 0.5 0 0 0 4.701 3.745 A 4 4 0 0 1 8.5 1"
      />
      <path
        className={classLightning}
        d="M 7.053 11.276 A 0.5 0.5 0 0 1 7.5 11 H 8.5 A 0.5 0.5 0 0 1 8.974 11.658 L 8.694 12.5 H 9.5 A 0.5 0.5 0 0 1 9.89 13.312 L 7.89 15.812 A 0.5 0.5 0 0 1 7.015 15.379 L 7.36 14 H 6.5 A 0.5 0.5 0 0 1 6.053 13.276 Z"
      />
    </svg>
  );
}

function CloudHaze() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-cloud-haze"
      viewBox="0 0 16 16"
    >
      <path
        className={classCloudLight}
        d="M 4 11.5 A 0.5 0.5 0 0 1 4.5 11 H 13.5 A 0.5 0.5 0 0 1 13.5 12 H 4.5 A 0.5 0.5 0 0 1 4 11.5 M 1 13.5 A 0.5 0.5 0 0 1 1.5 13 H 10.5 A 0.5 0.5 0 0 1 10.5 14 H 1.5 A 0.5 0.5 0 0 1 1 13.5 M 3 15.5 A 0.5 0.5 0 0 1 3.5 15 H 12.5 A 0.5 0.5 0 0 1 12.5 16 H 3.5 A 0.5 0.5 0 0 1 3 15.5 M 13.405 4.027 A 5.001 5.001 0 0 0 3.906 3.023 A 3.5 3.5 0 1 0 3.5 10 H 13 A 3 3 0 0 0 13.405 4.027 M 8.5 1 A 4 4 0 0 1 12.476 4.555 A 0.5 0.5 0 0 0 12.976 5 H 13 A 2 2 0 0 1 13 9 H 3.5 A 2.5 2.5 0 1 1 4.105 4.074 A 0.5 0.5 0 0 0 4.701 3.745 A 4 4 0 0 1 8.5 1"
      />
    </svg>
  );
}

function Lightning() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      className="bi bi-lightning"
      viewBox="0 0 16 16"
    >
      <path
        className={classLightning}
        d="M 5.52 0.359 A 0.5 0.5 0 0 1 6 0 H 10 A 0.5 0.5 0 0 1 10.474 0.658 L 8.694 6 H 12.5 A 0.5 0.5 0 0 1 12.895 6.807 L 5.895 15.807 A 0.5 0.5 0 0 1 5.022 15.353 L 6.823 9.5 H 3.5 A 0.5 0.5 0 0 1 3.02 8.859 Z M 6.374 1 L 4.168 8.5 H 7.5 A 0.5 0.5 0 0 1 7.978 9.147 L 6.78 13.04 L 11.478 7 H 8 A 0.5 0.5 0 0 1 7.526 6.342 L 9.306 1 Z"
      />
    </svg>
  );
}

export function WeatherIcon({
  weatherType,
  fallback,
}: {
  weatherType: number;
  fallback: ReactNode;
}) {
  switch (weatherType) {
    case 0: // Clear sky
      return <Moon />;
    case 1: // Sunny
      return <Sun />;
    case 2: // Partly cloudy (night)
      return <CloudMoon />;
    case 3: // Sunny intervals
      return <CloudSun />;
    case 4: // Sand storm
      return <Hurricane />;
    case 5: // Mist
    case 6: // Fog
      return <CloudFog />;
    case 7: // Light cloud
      return <CloudLight />;
    case 8: // Thick cloud
      return <CloudThick />;
    case 9: // Light Rain Showers (night)
    case 10: // Light Rain Showers (day)
      return <CloudRain />; // Bootstrap icons doesn't have an icon for cloud + rain + sun/moon
    case 11: // Drizzle
    case 12: // Light rain
      return <CloudDrizzle />;
    case 13: // Heavy rain showers (night)
    case 14: // Heavy rain showers (day)
      return <CloudRain />;
    case 15: // Heavy rain
      return <CloudRainHeavy />;
    case 39: // Light rain
      return <CloudDrizzle />;
    case 16: // Sleet showers (night)
    case 17: // Sleet showers (day)
    case 18: // Sleet
      return <CloudSleet />;
    case 19: // Hail showers (night)
    case 20: // Hail showers (day)
    case 21: // Hail
      return <CloudHail />;
    case 22: // Light snowy showers (night)
    case 23: // Light snowy showers (day)
    case 24: // Light snow
    case 25: // Heavy snow showers (night)
    case 26: // Heavy snow showers (day)
    case 27: // Heavy snow
      return <CloudSnow />;
    case 28: // Thundery showers (night)
    case 29: // Thundery showers (day)
    case 30: // Lightning
      return <CloudLightningRain />;
    case 31: // Hurricane/tornado
      return <Hurricane />;
    case 32: // Hazy
      return <CloudHaze />;
    case 33: // Sand storm
      return <Hurricane />;
    case 34: // Mist
    case 35: // Fog
      return <CloudFog />;
    case 36: // Light cloud
      return <CloudLight />;
    case 37: // Thick cloud
      return <CloudThick />;
    case 38: // Drizzle
      return <CloudDrizzle />;
    case 40: // Heavy rain
      return <CloudRainHeavy />;
    case 41: // Sleet
      return <CloudSleet />;
    case 42: // Hail
      return <CloudHail />;
    case 43: // Light snow
    case 44: // Heavy snow
      return <CloudSnow />;
    case 45: // Lightning
      return <Lightning />;
    case 46: // Hurricane/tornado
      return <Hurricane />;
    case 47: // Hazy
      return <CloudHaze />;
  }

  return fallback;
}
