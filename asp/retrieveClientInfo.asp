<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>
<style type="text/css">
#export input
  {
  background-color:#A7C942;
  color:#000000;
  border:5px,5px,5px,5px;
  margin:20px;
  font-size:20px;
  }
#clientTable
  {
  font-Family:"Trebuchet MS", Arial, Helvetica, sans-serif;
  width:60%;
  border-collapse:collapse;
  text-align:center;
  margin:10px;
  }
#clientTable th
  {
  background-color:#A7C942;
  color:#ffffff;
  }
#clientTable tr td
  {
  background-color:#EAF2D3;
  color:#000000;
  }
</style>
</head>
<body>
<!--#Include File="dbconn.asp"-->
<%
var user_id = Request.Form("userid");
var user_pwd = Request.Form("password");

var query_user = "SELECT * FROM CRM_users WHERE ID = '"+user_id+"' and pwd='"+user_pwd+" ' ";
var userResults = new ActiveXObject("ADODB.Recordset");
userResults.Open(query_user,conn,1,3);
if(userResults.EOF)
{
  Response.Write("<script>window.location.href='home_error.html'</script>");
  Response.Flush();
  Response.End();
}
%>
<%
var sql = "SELECT * FROM clients";
var rs = new ActiveXObject("ADODB.Recordset");
rs.Open(sql, conn, 1, 3);
rs.MoveFirst();
%>
<div>
  <form id="export" action="exportXLS.asp" method="get" align="left">
    <input type="submit" value="导出Excel"/>
  </form>
</div>

<table id="clientTable" border="1" align="center" width="60%">
  <tr>
    <th>姓名</th>
    <th>电话号码</th>
    <th>邮箱</th>
    <th>公司名称</th>
    <th>职位</th>
    <th>创建日期</th>
  </tr> 
<%
while(!rs.EOF){
%>
  <tr>
 <%
   for(var i=0; i<rs.Fields.Count; ++i){
 %>
    <td><%
          Response.Write(rs.Fields(i));}
    %></td>
    <%
    rs.MoveNext();%>
  </tr>
<%
}
rs.Close();
conn.Close();
%>
</table>
</body>
</html>
