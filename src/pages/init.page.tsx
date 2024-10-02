import React, { useEffect, useState } from 'react';

const InitPage = () => {
  const [install, setInstall] = useState(false);
  const handleInstall = () => {
    try {
      window.BX24.install(() => {
        setInstall(true);
      });
      window.BX24.installFinish();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleInstall();
  }, []);

  return <>{install && <>установлено</>}</>;
};

export default InitPage;
