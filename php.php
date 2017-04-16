<?php
/*
 * User: LJF
 * Date: 2017/3/12
 */
    header("Content-type: text/html; charset=gb2312");

    $hostname = 'localhost';
    $username = 'root';
    $password = '654321';
    $database = 'lizhi';
    $link = mysqli_connect($hostname, $username, $password, $database);
    if (!$link) {
        die('Connect Error (' . $link->connect_errno . ')'
            . $link->connect_error);
    }
    mysqli_query($link, "set names 'gb2312'");

    $url = "http://www.szu.edu.cn/board/";
    $curl = curl_init();
    curl_setopt($curl,CURLOPT_URL, $url);
    curl_setopt($curl,CURLOPT_HEADER, false);
    curl_setopt($curl,CURLOPT_RETURNTRANSFER, true);
    $content = curl_exec($curl);
    curl_close($curl);

//    $photo = explode('<div class="weiboShow_developer_pic">',$content);
//    $photo = explode('</div>',$photo[1]);
//    preg_match_all("/src=\"([^\"].*)\"/iUs",$photo[0],$avatar);
//    echo "<img src='".$avatar[1][0]."' height='50'/>";

    preg_match_all('/<td.* background="\/(.*)" class=.*>/', $content, $picture);
    $url2 = "http://www.szu.edu.cn/";

    $purl = "$url2"."{$picture[1][0]}";
    echo "<img src=$purl name='photo'></br>";
    $insert  = "INSERT INTO `image` (`image`) VALUES ('".$purl."')";
    if(mysqli_query($link, $insert)) {
        echo 'Insert image success</br>';
    }else{
        echo mysqli_error($link);
    }
    echo '</br>';

    preg_match_all('/<td align="center">\d+<\/td>(.*)<td align="center" style="font-size: 9pt">.*<\/td>.*<\/tr>/iUs', $content, $table);
    foreach ($table[0] as $table) {
        preg_match_all('/<td align="center">([0-9]*)<\/td>/', $table, $number);
        preg_match_all('/<a href="\?infotype=.*">(.*)<\/a>/', $table, $category);
        preg_match_all('/<a href=# onclick=".*">(.*)<\/a>/', $table, $department);
        preg_match_all('/<a.*>(.*)<\/a>/', $table, $title);
        preg_match_all('/<td align="center" style=".*">(.*)<\/td>/', $table, $date);
        preg_match_all('/<a target=_blank href="(.*)".*<\/a>/', $table, $detail);
        $titletxt = strip_tags($title[0][2]);

        $vurl = "$url"."{$detail[1][0]}";
        $viewUrl = curl_init();
        curl_setopt($viewUrl, CURLOPT_URL, $vurl);
        curl_setopt($viewUrl, CURLOPT_HEADER, false);
        curl_setopt($viewUrl, CURLOPT_RETURNTRANSFER, true);
        $view = curl_exec($viewUrl);
        curl_close($viewUrl);
        preg_match_all('/<P.*>/', $view, $details);
        $contents = '';
        foreach($details[0] as $details) {
            $contents = strip_tags($contents."{$details}");
        }
        echo $contents;
        echo '</br></br>';

        $query  = "INSERT INTO `spider` (`number`,`category`,`department`,`title`,`date`,`contents`) VALUES ('{$number[1][0]}','".$category[1][0]."','".$department[1][0]."','".$titletxt."','{$date[1][2]}','".$contents."')";
        if(mysqli_query($link, $query)) {
            echo 'insert success';
        }else{
            echo mysqli_error($link);
        }
        echo '</br>';
    }

    mysqli_close($link);

?>