<!--#Include File="dbconn.asp"-->
<%
Response.Charset = "utf-8";
Response.Clear();
Response.ContentType = "Application/vnd.ms-excel";
Response.AddHeader("Content-Disposition", "attachment; filename=clientsInfo.xls");
%>
<%
var sql = "SELECT * FROM clients";
var rs = new ActiveXObject("ADODB.Recordset");
rs.Open(sql, conn, 1, 3);
rs.MoveFirst();
%>
<table id="clientTable" border="1" align="center" width="60%">
  <tr>
    <td>����</td>
    <td>�绰����</td>
    <td>����</td>
    <td>��˾����</td>
    <td>ְλ</td>
    <td>��������</td>
  </tr>
<%
while(!rs.EOF){
%>
  <tr>
<%
  for(var i=0; i<rs.Fields.Count; ++i){
%>
    <td>
<%
    Response.Write(rs.Fields(i));
  }
%>
    </td>
<%  rs.MoveNext(); %>
  </tr>
<%
}
rs.Close();
conn.Close();
%>
</table>
<% Response.Flush();
Response.End();
%>
