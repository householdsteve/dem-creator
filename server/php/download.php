<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">

<html>
<head>
<!--
img{display: block; margin: 0px; padding:0px;}

a img{display: block; margin: 0px; padding:0px;}
-->
	<title><?php echo $_REQUEST['collection'];?></title>
</head>

<body>
<table align="center" width="600" cellspacing="0" cellpadding="0" border="0" style="font-size:0;">

<?php if($_REQUEST['header'] == "true"):?>
<!-- init:ecovu -->
<tr>
 <td colspan="1" height="40" align="center" class="small" style="font-size: 10px;color: #aaaaaa;font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;"><strong>ARMANI.com</strong><br>
If you have problems viewing this e-mail, <strong><a href="${online_version_url}$" style="font-size: 10px;color:#aaaaaa;font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;text-decoration: underline;">click here</a></strong><br>
</td>
</tr>
<!-- end:ecovu -->
<?php endif; ?>

<!-- INIZIO CONTENUTO -->
  
  

<tr><td>
  <?php 
  $link = $_REQUEST['link'];
  if($link != ""):?><a href="<?php echo $link;?>"><?php endif;?>
  <img src="<?php echo $_REQUEST['url'];?>" width="<?php echo $_REQUEST['width'];?>" height="<?php echo $_REQUEST['height'];?>" style="display: block; margin: 10px 0px; padding:0px; border:0px;"　border="0">
    <?php if($link != ""):?></a><?php endif;?>
</td></tr>
	
	
	<?php if($_REQUEST['footer'] == "true"):?>

<!-- FINE CONTENUTO (CONTROLLARE COLSPAN DEL PRIMO TD E DI QUELLO CHE SEGUE) --> 
    <tr>
      <td align="center" colspan="1"  class="small" style="font-size: 10px;color: #aaaaaa;font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;"><a href="http://www.giorgioarmani.com/index_ibrido.jsp?language=EN&site=CUS&htmlSession=../contactServlet.jsp&audio=acceso" style="font-size: 10px;color: #aaaaaa;font-family:Verdana, Geneva, Arial, Helvetica, sans-serif; text-decoration:none; font-weight:bold;">Contact Us</a> | <a href="http://www.armani.com/registration/media_en/privacy.html" style="font-size: 10px;color: #aaaaaa;font-family:Verdana, Geneva, Arial, Helvetica, sans-serif; text-decoration:none; font-weight:bold;">Privacy Policy</a><br>
        <br>
        To ensure delivery of ARMANI.com e-mail to your inbox,<br>
        please add <a style="font-size: 10px;color:#aaaaaa;font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;text-decoration: underline; font-weight:bold; text-decoration:none;">newsletter@armani.com</a> to your address book<br>
        <br>
        You are subscribed to this e-mail as ${SMTP_ADDR}$,<br>
        if you no longer wish to receive these messages, please <a href="http://clientsection.contactlab.it/service/unsubscribe/wfc/1920019372167/d/${encoded_user_data}$/k/${form_verification_code}$/" style="font-size: 10px;color:#aaaaaa;font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;text-decoration: underline; font-weight:bold;">click here</a><br>
        <br></td>
    </tr>
    
    <?php endif; ?>
</table>

</body>
</html>
<?php
function seoUrl($string) {
	//Unwanted:  {UPPERCASE} ; / ? : @ & = + $ , . ! ~ * ' ( )
	$string = strtolower($string);
	//Strip any unwanted characters
	$string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
	//Clean multiple dashes or whitespaces
	$string = preg_replace("/[\s-]+/", " ", $string);
	//Convert whitespaces and underscore to dash
	$string = preg_replace("/[\s_]/", "-", $string);
	return $string;
}
$col = seoUrl($_REQUEST['collection']);
header('Content-disposition: attachment; filename='.$col.'_newsletter-'.date('d_m-G:i:s',time()).'.html');
header('Content-type: text/html');
?>