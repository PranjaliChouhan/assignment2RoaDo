interface UserDevice {
    userId: string;
    deviceId: string;
    loggedIn: Date;
    loggedOut?: Date;
    lastSeenAt: Date;
  }
  
  function getMonthlyActiveUsers(userDevices: UserDevice[]): { [month: string]: string[] } {
    const monthlyActiveUsers: { [month: string]: string[] } = {};
  
    userDevices.forEach((userDevice) => {
      const loginMonth = userDevice.lastSeenAt.getMonth();
      const loginYear = userDevice.lastSeenAt.getFullYear();
      const monthKey = `${loginYear}-${loginMonth + 1}`;  
  
      if (!monthlyActiveUsers[monthKey]) {
        monthlyActiveUsers[monthKey] = [];
      }
  
      const userActiveInMonth = isUserActiveInMonth(userDevice, loginMonth, loginYear);
    
      if (userActiveInMonth) {
        monthlyActiveUsers[monthKey].push(userDevice.userId);
      }
    });
  
    return monthlyActiveUsers;
  }
  
  function isUserActiveInMonth(userDevice: UserDevice, month: number, year: number): boolean {
 
    const userLastSeenInMonth = userDevice.lastSeenAt >= new Date(year, month, 1) && userDevice.lastSeenAt <= new Date();
    return  userLastSeenInMonth;
  }
  
  // Example usage
  const userDevices: UserDevice[] = [
    // Sample data with login, logout, and lastSeenAt timestamps
    { userId: "user1", deviceId: "device1", loggedIn: new Date(2024, 2, 15), loggedOut: new Date(2024, 3, 20), lastSeenAt: new Date() },
    { userId: "user2", deviceId: "device2", loggedIn: new Date(2024, 1, 20), lastSeenAt: new Date() },
    // ... and so on
  ];
  
  const monthlyActiveUsers = getMonthlyActiveUsers(userDevices);
  console.log(monthlyActiveUsers); // { "2024-2": ["user1"], "2024-3": ["user1", "user2"] }