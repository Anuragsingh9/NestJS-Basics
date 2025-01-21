export function loginTemplate(data: any): string {
    const html = `
        <html>
            <body>
                <p>Hi ${data.name},</p>
                <p>You have successfully logged in to our platform.</p>
                <p>Thank you for using our platform.</p>
            </body>
        </html>
    `;

    return html;
}

export function registerTemplate(data: any): string {
    const html = `
        <html>
            <body>
                <p>Hi ${data.name},</p>
                <p>You have successfully registered to our platform.</p>
                <p>Your password is: ${data.email}. This is an auto generated password. Please change it once you login.</p><br>
                <p>Thank you for using our platform.</p>
            </body>
        </html>
    `;

    return html;
}