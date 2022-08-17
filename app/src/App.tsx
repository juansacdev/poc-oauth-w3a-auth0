import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Main from "./components/Main"
import MainRWA from "./components/MainRWA"
import Setting from "./components/Setting"
import { APP_CONFIG_TYPE } from "./config/appConfig"
import { CHAIN_CONFIG_TYPE } from "./config/chainConfig"
import { WEB3AUTH_NETWORK_TYPE } from "./config/web3AuthNetwork"
import { Web3AuthProvider } from "./services/web3auth"
import styles from "./styles/Home.module.css"

function App() {
  const [web3AuthNetwork, setWeb3AuthNetwork] = useState<WEB3AUTH_NETWORK_TYPE>("testnet");
  const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("solana");
  const [app, setApp] = useState<APP_CONFIG_TYPE>("RWA");
  useEffect(() => {
    setApp(window.sessionStorage.getItem("app") as APP_CONFIG_TYPE);
  }, [app]);
  return (
    <div className={styles.container}>
      <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork} app={app}>
        {/* <h1 className={styles.title}>
          <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
            Web3Auth
          </a>{" "}
          & Auth0 Example
        </h1> */}
        <img src="/images/web3authxauth0.png" className={styles.title} alt="" />
        <Setting setNetwork={setWeb3AuthNetwork} setChain={setChain} setApp={setApp} />
        <Router>
          <Routes>
            <Route path="/" element={<Main isJWT={false} appType={app} />} />
            <Route path="/rwa" element={<MainRWA />} />
          </Routes>
        </Router>
      </Web3AuthProvider>
      <footer className={styles.footer}>
        <a href="https://github.com/Web3Auth/Web3Auth/tree/master/demo/auth0-react-app" target="_blank" rel="noopener noreferrer">
          Source code {"  "}
          <img className={styles.logo} src="/images/github-logo.png" alt="github-logo" />
        </a>
      </footer>
    </div>
  );
}

export default App;
