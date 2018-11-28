const nodemailer = require("nodemailer");
const juice = require("juice");
const pug = require("pug");
const htmlToText = require("html-to-text");
const promisify = require("es6-promisify");

const transport = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
});

const generateHTML = (filename, options = {}) =>{
	const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
	const inline = juice(html); //css-inline
	return inline;
}

exports.sendEmail = async (options) =>{
	const html = generateHTML(options.filename, options);
	const text = htmlToText.fromString(html);

	const mailOptions = {
		from: "Samuel Douglas <noreply@samuelgd.com>",
		to: options.user.email,
		subject: options.subject,
		html,
		text
	};

	const send = promisify(transport.sendMail, transport);
	return send(mailOptions);
};