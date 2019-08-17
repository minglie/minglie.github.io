@echo off
del M.log
echo ===  清空日志  ===
javac -d . *.java
echo ===  running  ===
java MulThreadDownload
pause
