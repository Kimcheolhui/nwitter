import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";

import { authService } from "fbase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

const App = () => {
  const [init, setInit] = useState(false);

  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    console.log("되냐?");
    onAuthStateChanged(authService, (user) => {
      // user 값에는 로그인 상태일 경우 user에 대한 정보가, 로그아웃 상태일 경우 null값이 저장되어 있다.
      if (user !== null) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) =>
            updateProfile(user, { displayName: user.displayName }),
        });
      } else {
        setUserObj(null);
      }
      // init이 된 이후에 Router을 보여주기 위함
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) =>
        updateProfile(user, { displayName: user.displayName }),
    });
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing...."
      )}
    </>
  );
};

export default App;
