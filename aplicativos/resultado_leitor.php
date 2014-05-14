<?php
        $returncode="";

    if (isset($_GET["codigo"]) ){
            $returncode=$_GET["codigo"];
    }
?>

<HTML>
<HEAD>
<SCRIPT LANGUAGE="JavaScript" SRC="virtualid.js"></SCRIPT> 
</HEAD>

<BODY>
<script>
resultado = "<?php echo $returncode; ?>";
resultado = unescape(resultado);

if (resultado.indexOf(".com")>0) {
	alert("Abrindo página: "+resultado);
	window.location.href=resultado;
	}
	else {
	if (resultado.indexOf(String.fromCharCode(29))>-1) {
		alert("Código padrão ANVISA: \n"+resultado);
		resultado = separa_celular(resultado);
		}
		else {	
		alert("Informação decodificada: "+resultado);
		}
	window.location.href="../index.htm";
	}
</script>
</BODY>
</HTML>