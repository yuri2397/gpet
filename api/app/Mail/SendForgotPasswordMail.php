<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class SendForgotPasswordMail extends Mailable
{
    use Queueable, SerializesModels;
    public  $user;
    public $code;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $code)
    {
        //
        $this->user = $user;
        $this->code = $code;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject("Renitialisation de mot de passe")
            ->markdown("emails.on-forgot-password")->with([
                "user" => $this->user,
                "code" => $this->code,
                "url" => env("WEB_APP_HOST")
            ]);
    }
}
