<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendNewUserMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public $user,
        public $password,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Nouveau compte sur GPET',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'emails.on-create-user',
            with: [
                'user' => $this->user,
                'password' => $this->password,
                'url' => config('app.frontend_url', env('WEB_APP_HOST')),
            ],
        );
    }
}
