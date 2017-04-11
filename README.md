# external_file_password
After a file is a created with a pre-hashed password, the script can load the file and parse the password.

Currently the file is setup to: 
1. Detect a specific usb drive
2. Load the encrypted password from the drive
3. Decrypt the password and copy it to the clipboard
4. Eject the drive
5. After 10s, copy ' ' (a space) to the clipboard

I have terrible password management and I don't trust anyone else with my passwords either. The purpose of this exploratory script is to start experimenting with alternative methods to manage passwords offline
