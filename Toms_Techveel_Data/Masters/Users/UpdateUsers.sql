If Exists(
  Select
    UserName
  From
    TblUserMst
  Where
    Userid not in (@Userid)
    and UserName = @UserName
) 

Begin 
Raiserror(50001, 16, 3) Return
End
else
 BEGIN
Update
  TblUserMst
set
  UserCode = @UserCode,
  UserName = @UserName,
  UserPassWord = @UserPassWord,
  ActiveStatus=@ActiveStatus,
  ModifyBy = @ModifyBy,
  ModifyDate = GETDATE()
where
  Userid = @Userid
end