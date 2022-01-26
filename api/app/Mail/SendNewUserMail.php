<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use Illuminate\Support\Facades\URL;

class SendNewUserMail extends Mailable
{
    use Queueable, SerializesModels;
    public User $user;
    public $password;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, $password)
    {
        $this->user = $user;
        $this->password = $password;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject("Nouveau compte sur GPET")
        ->markdown("emails.on-create-user")->with([
            "user" => $this->user,
            "password" => $this->password,
            "url" => env("WEB_APP_HOST")
        ]);
    }
}
