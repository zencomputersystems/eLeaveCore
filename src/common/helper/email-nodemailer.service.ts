/**
 * Declare nodemailer
 */
var nodemailer = require('nodemailer');
/**
 * Declare smtpTransport
 */
var smtpTransport = require('nodemailer-smtp-transport');
/**
 * Declare handlebars
 */
var handlebars = require('handlebars');
/**
 * Declare fs
 */
var fs = require('fs');

/**
 * Service for email nodemailer
 *
 * @export
 * @class EmailNodemailerService
 */
export class EmailNodemailerService {

    /**
     * Method process mail
     *
     * @param {string} email
     * @param {string} token
     * @returns
     * @memberof EmailNodemailerService
     */
    public mailProcess(email: string, codeUrl: string) {
        smtpTransport = this.createSMTP();

        var replacements = {
            email: email,
            code: codeUrl
        };
        var from = process.env.SMTPUSER;//'wantan.wonderland.2018@gmail.com';
        var emailTosend = email;
        var subject = 'Testing Invitation System ✔';

        let data = {};
        data['replacement'] = replacements;
        data['from'] = from;
        data['emailTosend'] = emailTosend;
        data['subject'] = subject;

        let dataRes = this.readHTMLFile('src/common/email-templates/userinvitation.html', this.callbackReadHTML(data));

        return "success";
    }


    /**
     * mail process for approval leave
     *
     * @param {string} email
     * @param {string} name
     * @returns
     * @memberof EmailNodemailerService
     */
    public mailProcessApprove(email: string, name: string) {
        smtpTransport = this.createSMTP();

        var replacements = {
            email: email,
            code: "#" + name,
            name: name
        };
        var from = process.env.SMTPUSER;//'wantan.wonderland.2018@gmail.com';
        var emailTosend = email;
        var subject = 'Leave approval ✔';

        let data = {};
        data['replacement'] = replacements;
        data['from'] = from;
        data['emailTosend'] = emailTosend;
        data['subject'] = subject;

        let dataRes = this.readHTMLFile('src/common/email-templates/notifyleaveapprove.html', this.callbackReadHTML(data));

        return "success";
    }

    /**
     * Mail process forgot password
     *
     * @param {string} email
     * @returns
     * @memberof EmailNodemailerService
     */
    public mailProcessForgotPassword(email: string) {
        smtpTransport = this.createSMTP();

        var replacements = {
            email: email,
            code: "whereami." + email,
            name: email
        };
        var from = process.env.SMTPUSER;//'wantan.wonderland.2018@gmail.com';
        var emailTosend = email;
        var subject = 'Forgot password eLeave';

        let data = {};
        data['replacement'] = replacements;
        data['from'] = from;
        data['emailTosend'] = emailTosend;
        data['subject'] = subject;

        let dataRes = this.readHTMLFile('src/common/email-templates/forgotpassword.html', this.callbackReadHTML(data));

        return { "status": "email send" };
    }

    /**
     * Setup and send email
     *
     * @memberof EmailNodemailerService
     */
    public callbackReadHTML = (data) => async function (err, html) {

        var template = handlebars.compile(html);
        // var replacements = {
        //     email: email,
        //     code: "#" + name,
        //     name: name
        // };
        var htmlToSend = template(data.replacement);
        var mailOptions = {
            from: data.from, // 'wantan.wonderland.2018@gmail.com',
            to: data.emailTosend, // email,
            subject: data.subject, // 'Leave approval ✔',
            html: htmlToSend
        };

        return await smtpTransport.sendMail(mailOptions, async function (error, info) {
            if (error) {
                console.log(error);
                return await error;
            } else {
                console.log(info);
                return await info;
            }
        });
    }

    /**
     * Method read html file
     *
     * @memberof EmailNodemailerService
     */
    public readHTMLFile = function (path, callback) {
        return fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };

    /**
     * Setup smtp data
     *
     * @returns
     * @memberof EmailNodemailerService
     */
    public createSMTP() {
        smtpTransport = nodemailer.createTransport({
            host: process.env.SMTPHOST || "smtp.ethereal.email",
            port: parseInt(process.env.SMTPPORT) || 587,
            secure: JSON.parse(process.env.SMTPSECURE) || false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTPUSER || 'casimir.mcglynn@ethereal.email',
                pass: process.env.SMTPPASSWORD || 'GYSA4r14EQRPB9guAK'
            }
        });
        return smtpTransport;
    }
}