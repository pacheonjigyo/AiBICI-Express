import { makeAutoObservable, runInAction } from "mobx";
import { floatingToast } from "../common/FloatingToast.js";
import { sleep } from "../common/Functions.js";
import { APIGateway } from "../common/Gateway.js";
import { wordList } from "../data/words.js";
import { AppInfo, BaseInfo } from "../types.js";

export class commonStore {
  constructor() {
    makeAutoObservable(this);

    this.loadEasyLogin();
    this.loadAppInfo();

    // this.syncAppInfo(this.appInfo.isAdmin, false, "");
  }

  modalInfo: any = {
    make: false,
  };

  loading = false;

  navigate: any = null;

  gptDrawer = false;

  isEntrance = false;

  popOver = {
    branding: false,
    work: false,
    info: false,
    about: false,
  };

  loginType = "simple";
  loginStep = 1;
  loginLoading = false;

  baseInfo = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  appInfo = {
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",

    accessToken: "",
    refreshToken: "",

    isAdmin: false,

    language: "ko",
    // language:
    //   navigator.language === "ko" || navigator.language === "ko-KR"
    //     ? "ko"
    //     : navigator.language === "en" || navigator.language === "en-US"
    //     ? "en"
    //     : "ko",

    userType: "user",
  };

  signFlighting = false;

  device = "desktop";

  isDesktop = false;

  drawerAppState = false;
  drawerBaseState = false;

  userInfo: any = null;
  userPopOver = false;

  mainPopOver = false;

  popup: any = null;

  redirectUrl = "";

  confirmModal = false;

  setModalInfo = async (value: boolean) => {
    this.modalInfo = value;
  };

  setConfirmModal = async (value: boolean) => {
    this.confirmModal = value;
  };

  setLoading = (value: boolean) => {
    this.loading = value;
  };

  setNavigate = (value: any) => {
    this.navigate = value;
  };

  setRedirectUrl = (value: string) => {
    this.redirectUrl = value;
  };

  setGptDrawer = (value: boolean) => {
    this.gptDrawer = value;
  };

  setEntrance = (value: boolean) => {
    this.isEntrance = value;
  };

  setPopOver = (value: any) => {
    this.popOver = value;
  };

  setMainPopOver = (value: boolean) => {
    this.mainPopOver = value;
  };

  loadEasyLogin = () => {
    window.addEventListener("message", async (event) => {
      const from = event.data.from;

      if (!from || from !== "aibici") {
        return;
      }

      const json = event.data;

      if (!this.popup) {
        return;
      }

      if (json.code === 200) {
        this.setAppInfo({
          ...this.appInfo,

          isAdmin: false,

          accessToken: json.data.accessToken,
          refreshToken: json.data.refreshToken,
        });

        this.signIn(this.appInfo.isAdmin);
      } else {
        alert(json.message);
      }

      this.popup.close();
    });
  };

  setLoginType = (value: any) => {
    this.loginType = value;
  };

  setPopup = (value: any) => {
    this.popup = value;
  };

  setLoginStep = async (value: number) => {
    this.loginLoading = true;

    if (value === 2) {
      await sleep(1000 * 1);
    }

    runInAction(() => {
      this.loginStep = value;
      this.loginLoading = false;
    });
  };

  initAppInfo = () => {
    this.userInfo = null;

    this.setAppInfo({
      ...this.appInfo,

      email: "",
      password: "",
      passwordConfirm: "",

      accessToken: "",
      refreshToken: "",
    });
  };

  loadAppInfo = async () => {
    const appInfo = JSON.parse(
      localStorage.getItem("web_aibici_storage") ?? "{}",
    );

    if (Object.keys(appInfo).length > 0) {
      this.appInfo = appInfo;
    }
  };

  syncAppInfo = async (
    isAdmin: boolean,
    autoLogout: boolean,
    redirectUrl: string,
  ) => {
    const userData = await APIGateway(
      {
        query: isAdmin ? "sysop/profile" : "profile",
        method: "GET",
        auth: true,
        data: null,
      },
      false,
    );

    runInAction(() => {
      this.loadAppInfo();
    });

    if (userData.error && autoLogout) {
      runInAction(() => {
        this.initAppInfo();
        this.isEntrance = true;

        if (redirectUrl) {
          this.redirectUrl = redirectUrl;
        }
      });

      // floatingToast(
      //   wordList["로그인 후 이용해주세요."][this.appInfo.language],
      //   "failed",
      //   this.isDesktop,
      // );

      return false;
    }

    runInAction(() => {
      this.userInfo = userData;
    });

    return true;
  };

  checkProfile = async (isAdmin: boolean) => {
    const userData = await APIGateway(
      {
        query: isAdmin ? "sysop/profile" : "profile",
        method: "GET",
        auth: true,
        data: null,
      },
      false,
    );

    if (userData.error) {
      // floatingToast(
      //   wordList["로그인 후 이용해주세요."][this.appInfo.language],
      //   "failed",
      //   this.isDesktop,
      // );

      runInAction(() => {
        this.initAppInfo();
      });

      return false;
    }

    runInAction(() => {
      this.userInfo = userData;
    });

    return true;
  };

  setUserPopOver = (value: boolean) => {
    this.userPopOver = value;
  };

  setBaseInfo = (value: BaseInfo) => {
    this.baseInfo = value;
  };

  setAppInfo = (value: AppInfo) => {
    this.appInfo = value;

    localStorage.setItem("web_aibici_storage", JSON.stringify(value));
  };

  setDevice = (value: string) => {
    this.device = value;
  };

  setDesktop = (value: boolean) => {
    this.isDesktop = value;
  };

  setDrawerAppState = (value: boolean) => {
    this.drawerAppState = value;
  };

  setDrawerBaseState = (value: boolean) => {
    this.drawerBaseState = value;
  };

  checkEmail = async () => {
    if (!this.appInfo.email) {
      alert("먼저 이메일을 입력해주세요.");

      return;
    }

    const emailData = await APIGateway(
      {
        query: "checkemail",
        method: "POST",
        data: {
          email: this.appInfo.email,
        },
        auth: false,
      },
      true,
    );

    runInAction(() => {
      if (emailData.error) {
        this.setLoginStep(2);

        return;
      }

      const accept = confirm(
        "아직 가입되지 않은 계정이에요. 회원가입을 진행하시겠어요?",
      );

      if (!accept) {
        return;
      }

      this.verifyEmail();
    });
  };

  verifyEmail = async () => {
    if (!this.appInfo.email) {
      alert("먼저 이메일을 입력해주세요.");

      return;
    }

    const emailData = await APIGateway(
      {
        query: "email",
        method: "POST",
        data: {
          email: this.appInfo.email,
        },
        auth: false,
      },
      true,
    );

    if (emailData.error) {
      alert(
        this.appInfo.language === "ko"
          ? "해당 이메일은 현재 사용하실 수 없어요. 다른 이메일을 사용해주세요."
          : "This email is not available at this time. Please use another email.",
      );

      return;
    }

    alert(
      this.appInfo.language === "ko"
        ? "해당 이메일로 가입링크가 전송되었어요. 이메일을 확인해주세요."
        : "The subscription link was sent to that email. Please check your email.",
    );
  };

  signIn = async (isAdmin: boolean) => {
    this.signFlighting = true;

    if (this.loginType === "website") {
      const loginData = await APIGateway(
        {
          query: isAdmin ? "sysop/login" : "login",
          method: "POST",
          data: {
            email: this.appInfo.email,
            password: this.appInfo.password,
          },
          auth: false,
        },
        true,
      );

      runInAction(() => {
        this.signFlighting = false;
      });

      if (loginData.error) {
        alert(loginData.error.message);

        return;
      }

      runInAction(() => {
        this.setAppInfo({
          ...this.appInfo,

          isAdmin,

          accessToken: loginData.accessToken,
          refreshToken: loginData.refreshToken,
        });
      });
    } else {
      this.signFlighting = false;
    }

    floatingToast(
      wordList["로그인되었습니다."][this.appInfo.language],
      "success",
      this.isDesktop,
    );

    if (this.redirectUrl) {
      this.navigate(this.redirectUrl);
    } else {
      switch (window.location.pathname) {
        case "/login/user": {
          this.navigate(`/home`);

          break;
        }

        case "/login/admin": {
          this.navigate("/admin");

          break;
        }

        default: {
          this.syncAppInfo(this.appInfo.isAdmin, false, "");

          break;
        }
      }
    }

    this.redirectUrl = "";
  };

  signUp = async (isAdmin: boolean) => {
    console.log(isAdmin);

    if (
      !this.appInfo.password ||
      this.appInfo.password !== this.appInfo.passwordConfirm
    ) {
      alert("비밀번호를 확인해주세요.");

      return false;
    }

    if (!this.appInfo.phone) {
      alert("연락처를 입력해주세요.");

      return false;
    }

    this.signFlighting = true;

    const signUpData = await APIGateway(
      {
        query: "register",
        method: "POST",
        data: {
          email: this.appInfo.email,
          password: this.appInfo.password,
          confirm_password: this.appInfo.passwordConfirm,
          phone_number: this.appInfo.phone,
        },
        auth: false,
      },
      true,
    );

    runInAction(() => {
      this.signFlighting = false;
    });

    if (signUpData.error) {
      alert(signUpData.error.message);

      return;
    }

    alert(
      this.appInfo.language === "ko"
        ? "회원가입이 완료되었어요. 다시 로그인해주세요."
        : "The membership registration has been completed. Please login again.",
    );

    this.redirectUrl = "/";

    this.navigate(this.appInfo.isAdmin ? "/login/admin" : "/login/user");
  };

  resetPassword = async (token: string | null) => {
    if (!token) {
      return;
    }

    if (this.appInfo.password !== this.appInfo.passwordConfirm) {
      alert(
        this.appInfo.language === "ko"
          ? "비밀번호를 확인해주세요."
          : "Please check your password.",
      );

      return;
    }

    this.signFlighting = true;

    const signUpData = await APIGateway(
      {
        query: `resetPassword?token=${token}`,
        method: "POST",
        data: {
          password: this.appInfo.password,
        },
        auth: false,
      },
      true,
    );

    runInAction(() => {
      this.signFlighting = false;

      if (signUpData.error) {
        alert(signUpData.error.message);

        return;
      }

      alert(
        this.appInfo.language === "ko"
          ? "비밀번호가 변경되었어요. 다시 로그인해주세요."
          : "The password has been changed. Please login again.",
      );
    });

    this.navigate(this.appInfo.isAdmin ? "/login/admin" : "/login/user");
  };
}
