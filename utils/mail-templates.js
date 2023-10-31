import fs from 'fs';
import path from 'path';

export function plainEmailTemplate(heading, message) {
	return `
	<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Welcome to PhoneSlips</title>
	<style>
		* {
			margin: 0;
			font-family: Arial, Helvetica, sans-serif;
		}

	:root {
			--main: #FF0022;
			--dark: "#595959";
			--midDark: "#7F7F7F";
			--mid: "#595959";
			--lightMid: "#CCCCCC";
			--light: "#F2F2F2";
		}
		.logo {
			max-height: 150px;
			width: 250px;
			text-align: left;
		}

		.outer-container {
			width: 100vw;
			background-color: #efefef;
			height: 100vh;

		}

			.inner-container {
			/* max-width: 450px; */
			padding: 20px;
			padding-top: 50px;
			padding-bottom: 45px;
			border-radius: 5px;
			background-color: white;
			position: absolute;
			left: 50%;
			top: 50%;
			display: flex;
			flex-direction: column;
			transform: translate(-50%, -50%);
			width: 80%
		}

		.btn {
			background-color: var(--main);
			appearance: button;
			backface-visibility: hidden;
			background-color: #405cf5;
			border-radius: 6px;
			border-width: 0;
			box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .1) 0 2px 5px 0, rgba(0, 0, 0, .07) 0 1px 1px 0;
			box-sizing: border-box;
			color: #fff;
			cursor: pointer;
			line-height: 1.15;
			margin: 12px 0 0;
			outline: none;
			overflow: hidden;
			padding: 0 25px;
			position: relative;
			text-align: center;
			text-transform: none;
			transform: translateZ(0);
			transition: all .2s, box-shadow .08s ease-in;
			user-select: none;
			-webkit-user-select: none;
			touch-action: manipulation;
			font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif;
			font-size: 1.7em;
			padding: 15px;
			width: 75%;
			max-width: 400px;
		}

		a {
			text-decoration: none;
			color: black,
		}

		.btn:hover {
			cursor: pointer;
			opacity: .8;
		}

		span {
			color: var(--main);
		}

		.logoContainer {
			padding-bottom: 25px;
			text-align: left !important;
		}

		h2 {
			font-size: 2em;
		}

		p {
			font-size: 1.3em;
			line-height: 1.5;

		}

		.btn-container {
			display: flex;
			justify-content: center;
			margin: 45px 0px;
		}

		.text-container {
			margin: 0;
			padding-top: 15px;
		}

		.signature {
			margin-top: 35px;
			font-weight: 100;
		}
	</style>
</head>
<body>
	<div class="outer-container">
		<div class="inner-container">
			<div class="logoContainer">
				<a href="http://localhost:3000">
					<h2>Rhyme<span>Tight</span></h2>
				</a>
			</div>

			<div class="text-container">
				<h2>Welcome to <span>RhymeTight!</span></h2>
				<p>${heading}</p>
			</div>

			<div class="text-container">
				<p>${message}</p>
			</div>

			<div class="text-container signature">
				<p>- Your RhymeTight Team </p>
			</div>

		</div>
	</div>
</body>
</html>

`;
}
export function generateVerifyEmailTemplate(code) {
	return `
	<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>RhymeTight</title>
	<style>
		* {
			margin: 0;
			font-family: Arial, Helvetica, sans-serif;
		}

		:root {
			--main: #FF0022;
			--dark: "#595959";
			--midDark: "#7F7F7F";
			--mid: "#595959";
			--lightMid: "#CCCCCC";
			--light: "#F2F2F2";
		}

		a {
			text-decoration: none;
			color: black,
		}

		.logo {
			max-height: 150px;
			width: 250px;
			text-align: left;
		}

		.outer-container {
			width: 100vw;
			background-color: #efefef;
			height: 100vh;

		}

			.inner-container {
			/* max-width: 450px; */
			padding: 20px;
			padding-top: 50px;
			padding-bottom: 45px;
			border-radius: 5px;
			background-color: white;
			position: absolute;
			left: 50%;
			top: 50%;
			display: flex;
			flex-direction: column;
			transform: translate(-50%, -50%);
			width: 80%
		}

		.btn {
			background-color: var(--main);
			appearance: button;
			backface-visibility: hidden;
			background-color: #405cf5;
			border-radius: 6px;
			border-width: 0;
			box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .1) 0 2px 5px 0, rgba(0, 0, 0, .07) 0 1px 1px 0;
			box-sizing: border-box;
			color: #fff;
			cursor: pointer;
			line-height: 1.15;
			margin: 12px 0 0;
			outline: none;
			overflow: hidden;
			padding: 0 25px;
			position: relative;
			text-align: center;
			text-transform: none;
			transform: translateZ(0);
			transition: all .2s, box-shadow .08s ease-in;
			user-select: none;
			-webkit-user-select: none;
			touch-action: manipulation;
			font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif;
			font-size: 1.7em;
			padding: 15px;
			width: 75%;
			max-width: 400px;
		}

		.btn:hover {
			cursor: pointer;
			opacity: .8;
		}

		span {
			color: var(--main);
		}

		.logoContainer {
			padding-bottom: 25px;
			text-align: left !important;
		}

		h2 {
			font-size: 2em;
		}

		p {
			font-size: 1.3em;
			line-height: 1.5;

		}

		.btn-container {
			display: flex;
			justify-content: center;
			margin: 45px 0px;
		}

		.text-container {
			margin: 0;
			padding-top: 15px;
		}

		.signature {
			margin-top: 35px;
			font-weight: 100;
		}
	</style>
</head>
<body>
	<div class="outer-container">
		<div class="inner-container">
			<div class="logoContainer">
				<a href="http://localhost:3000">
					<h2>Rhyme<span>Tight</span></h2>
				</a>
			</div>

			<div class="text-container">
				<h2>Before we <span>get started...</span></h2>
				<p>Please take a second to make sure your email is correct</p>
			</div>

			<div class="btn-container">
				<button class="btn">Your Verification Code is: ${code}</button>
			</div>

			<div class="text-container">
				<p>Click above to begin </p>
				<p>Or copy and paste this link into your browser: ${code}</p>
			</div>

			<div class="text-container signature">
				<p>- Your RhymeTight Team </p>
			</div>

		</div>
	</div>
</body>
</html>
`;
}
export function generateResetPasswordEmailTemplate(url) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Reset your PhoneSlips Password</title>
	<style>
		* {
			margin: 0;
			font-family: Arial, Helvetica, sans-serif;
		}

		a {
			text-decoration: none;
			color: black,
		}

	:root {
			--main: #FF0022;
			--dark: "#595959";
			--midDark: "#7F7F7F";
			--mid: "#595959";
			--lightMid: "#CCCCCC";
			--light: "#F2F2F2";
		}

		.logo {
			max-height: 150px;
			width: 250px;
			text-align: left;
		}

		.outer-container {
			width: 100vw;
			background-color: #efefef;
			height: 100vh;

		}

			.inner-container {
			/* max-width: 450px; */
			padding: 20px;
			padding-top: 50px;
			padding-bottom: 45px;
			border-radius: 5px;
			background-color: white;
			position: absolute;
			left: 50%;
			top: 50%;
			display: flex;
			flex-direction: column;
			transform: translate(-50%, -50%);
			width: 80%
		}

		.btn {
			background-color: var(--main);
			appearance: button;
			backface-visibility: hidden;
			background-color: #405cf5;
			border-radius: 6px;
			border-width: 0;
			box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .1) 0 2px 5px 0, rgba(0, 0, 0, .07) 0 1px 1px 0;
			box-sizing: border-box;
			color: #fff;
			cursor: pointer;
			line-height: 1.15;
			margin: 12px 0 0;
			outline: none;
			overflow: hidden;
			padding: 0 25px;
			position: relative;
			text-align: center;
			text-transform: none;
			transform: translateZ(0);
			transition: all .2s, box-shadow .08s ease-in;
			user-select: none;
			-webkit-user-select: none;
			touch-action: manipulation;
			font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif;
			font-size: 1.7em;
			padding: 15px;
			width: 75%;
			max-width: 400px;
		}

		.btn:hover {
			cursor: pointer;
			opacity: .8;
		}

		span {
			color: var(--main);
		}

		.logoContainer {
			padding-bottom: 25px;
			text-align: left !important;
		}

		h2 {
			font-size: 2em;
		}

		p {
			font-size: 1.3em;
			line-height: 1.5;

		}

		.btn-container {
			display: flex;
			justify-content: center;
			margin: 45px 0px;
		}

		.text-container {
			margin: 0;
			padding-top: 15px;
		}

		.signature {
			margin-top: 35px;
			font-weight: 100;
		}
	</style>
</head>
<body>
	<div class="outer-container">
		<div class="inner-container">
			<div class="logoContainer">
				<a href="http://localhost:3000">
					<h2>Rhyme<span>Tight</span></h2>
				</a>
			</div>


			<div class="btn-container">
				<a href=${url}>
					<button class="btn">
						Reset Password
					</button>
				</a>
			</div>

			<div class="text-container signature">

				<p>- Your RhymeTight Team </p>
			</div>

		</div>
	</div>
</body>
</html>`;
}
export function generateSuccessfulPasswordResetEmailTemplate(heading, message) {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Welcome to PhoneSlips</title>
	<style>
		* {
			margin: 0;
			font-family: Arial, Helvetica, sans-serif;
		}

	:root {
			--main: #FF0022;
			--dark: "#595959";
			--midDark: "#7F7F7F";
			--mid: "#595959";
			--lightMid: "#CCCCCC";
			--light: "#F2F2F2";
		}

		.logo {
			max-height: 150px;
			width: 250px;
			text-align: left;
		}

		.outer-container {
			width: 100vw;
			background-color: #efefef;
			height: 100vh;

		}

			.inner-container {
			/* max-width: 450px; */
			padding: 20px;
			padding-top: 50px;
			padding-bottom: 45px;
			border-radius: 5px;
			background-color: white;
			position: absolute;
			left: 50%;
			top: 50%;
			display: flex;
			flex-direction: column;
			transform: translate(-50%, -50%);
			width: 80%
		}

		.btn {
			background-color: var(--main);
			appearance: button;
			backface-visibility: hidden;
			background-color: #405cf5;
			border-radius: 6px;
			border-width: 0;
			box-shadow: rgba(50, 50, 93, .1) 0 0 0 1px inset, rgba(50, 50, 93, .1) 0 2px 5px 0, rgba(0, 0, 0, .07) 0 1px 1px 0;
			box-sizing: border-box;
			color: #fff;
			cursor: pointer;
			line-height: 1.15;
			margin: 12px 0 0;
			outline: none;
			overflow: hidden;
			padding: 0 25px;
			position: relative;
			text-align: center;
			text-transform: none;
			transform: translateZ(0);
			transition: all .2s, box-shadow .08s ease-in;
			user-select: none;
			-webkit-user-select: none;
			touch-action: manipulation;
			font-family: -apple-system, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif;
			font-size: 1.7em;
			padding: 15px;
			width: 75%;
			max-width: 400px;
		}

		a {
			text-decoration: none;
			color: black,
		}

		.btn:hover {
			cursor: pointer;
			opacity: .8;
		}

		span {
			color: var(--main);
		}

		.logoContainer {
			padding-bottom: 25px;
			text-align: left !important;
		}

		h2 {
			font-size: 2em;
		}

		p {
			font-size: 1.3em;
			line-height: 1.5;

		}

		.btn-container {
			display: flex;
			justify-content: center;
			margin: 45px 0px;
		}

		.text-container {
			margin: 0;
			padding-top: 15px;
		}

		.signature {
			margin-top: 35px;
			font-weight: 100;
		}
	</style>
</head>
<body>
	<div class="outer-container">
		<div class="inner-container">
			<div class="logoContainer">
				<a href="http://localhost:3000">
					<h2>Rhyme<span>Tight</span></h2>
				</a>
			</div>

			<div class="text-container">
				<p>${heading}</p>
			</div>

			<div class="text-container">
				<p>${message}</p>
			</div>

			<div class="text-container signature">
				<p>- Your RhymeTight Team </p>
			</div>
		</div>
	</div>
</body>
</html>`;
}
