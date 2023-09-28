<?php

    // LOGS
    function logging($name, $phone, $address1, $address2){
        $ip = $_SERVER['REMOTE_ADDR'];
        $log = "IP=$ip, name=$name, phone=$phone, address1=$address1, address2=$address2 \n";
        $file = 'logform.txt';
        $fd = fopen($file, 'a');
        fwrite($fd, $log);
        fclose($fd);
    }

    if(count($_POST) > 0){

        // SPAM
        if(!isset($_POST['surname'])){

            $name = $_POST['name'];
            $phone = $_POST['inputPhone'];
            $address1 = $_POST['address'];
            $address2 = $_POST['addressMap'];
    
            // SQL-injection/XSS/VALIDATION
            $name = addslashes(strip_tags(trim($name)));
            $phone = addslashes(strip_tags(trim($phone)));
            $address1 = addslashes(strip_tags(trim($address1)));
            $address2 = addslashes(strip_tags(trim($address2)));
    
            // RETURN STATUS CODE
            if(empty($phone) || empty($address1) || empty($address2)){
                logging($name, $phone, $address1, $address2);
                $message = 'Произошла ошибка...';
                $s_code = 400;
            }
            else {
                logging($name, $phone, $address1, $address2);
                $message = 'Успешно отправлено!';
                $s_code = 200;
            }
            
            $response = ['message' => $message];
        
            header('Content-type: application/json');
            http_response_code($s_code);
            echo json_encode($response);

        }
    }

?>