<!--#Include File="dbconn.asp"-->
<%
var dec=decodeURIComponent;
var name = dec(Request.QueryString("name"));
var telephone = dec(Request.QueryString("tel"));
var email = dec(Request.QueryString("email"));
var cmd = new ActiveXObject("ADODB.Command");
cmd.ActiveConnection = conn;
cmd.CommandText = "INSERT INTO clients(name,phone,email,company,position,date) VALUES(?,?,?,'company','position',GETDATE())";
cmd.Parameters.Append(cmd.CreateParameter("?", 200, 1, 50, name));
cmd.Parameters.Append(cmd.CreateParameter("?", 200, 1, 50, telephone));
cmd.Parameters.Append(cmd.CreateParameter("?", 200, 1, 50, email));
cmd.Execute();
conn.Close();
Response.Write("success");

%>
