<%@ language="Javascript" %>
<%
var conn=new ActiveXObject("ADODB.Connection");
conn.ConnectionString = "PROVIDER=SQLOLEDB;DATA SOURCE=fx-pc\\SQLEXPRESS;USER ID=sa;PASSWORD=234458;INITIAL CATALOG=CIMS";
conn.Open(); 
%>
