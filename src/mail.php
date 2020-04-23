<?php

if (isset($_POST['userName']) && isset($_POST['userMail']) && isset($_POST['userTel'])) {
    $name = $_POST['userName'];
    $name = htmlspecialchars($name);
    $name = urldecode($name);
    $name = trim($name);
    $email = $_POST['userMail'];
    $email = htmlspecialchars($email);
    $email = urldecode($email);
    $email = trim($email);
    $telephone = $_POST['userTel'];
    $telephone = htmlspecialchars($telephone);
    $telephone = urldecode($telephone);
    $telephone = trim($telephone);

    echo $name;
    echo $email;
    echo $telephone;


    if (mail("krotoratortor@gmail.com", "Подписка: ",  "Имя:" . $name . ". E-mail: " . $email . "Телефон: " . $telephone, "From: krotorator@purple.kl.com.ua \r\n")) {
        echo "сообщение успешно отправлено";
        echo "Имя:" . $name . ". E-mail: " . $email . "Телефон: " . $telephone;
    } else {
        echo "при отправке сообщения возникли ошибки";
    }
}
