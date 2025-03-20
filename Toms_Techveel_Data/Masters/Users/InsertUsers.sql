If Exists(
  Select
   UserCode
  From
    TblUserMst
  Where
    UserCode = @UserCode
) Begin Raiserror(50001, 16, 3) Return
End
else begin
insert into
  TblUserMst(UserCode, UserName,UserPassWord,ActiveStatus, CreatedBy, CreatedDate)
Values
  (@UserCode, @UserName,@UserPassWord,@ActiveStatus, @CreatedBy, GETDATE())
SELECT
  SCOPE_IDENTITY() AS Userid
End