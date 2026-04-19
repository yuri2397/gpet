<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendForgotPasswordMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public $user,
        public $code,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Reinitialisation de mot de passe',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.on-forgot-password',
            with: [
                'user' => $this->user,
                'code' => $this->code,
                'url' => config('app.frontend_url', env('WEB_APP_HOST')),
            ],
        );
    }
}
