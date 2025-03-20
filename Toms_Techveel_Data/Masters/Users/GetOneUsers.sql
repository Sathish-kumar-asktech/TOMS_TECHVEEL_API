select UserCode,
UserName,
UserPassWord,ActiveStatus
from TblUserMst
where Userid=@Userid