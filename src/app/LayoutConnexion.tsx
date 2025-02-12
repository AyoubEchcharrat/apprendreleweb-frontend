"use client";

import Link from "next/link";
import { logout, refreshUserDatas } from "@/redux/features/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import "./LayoutConnexion.css";

export default function LayoutConnexion() {
  const { userToken, dataLoad } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const [isClient, setIsClient] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [isCheckTrue, setIsCheckTrue] = useState(false);

  useEffect(() => {
    const checkUserToken = async () => {
      if (!userToken) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setIsCheckTrue(res.status === 200);
        if (res.status === 401) dispatch(logout());
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };
    checkUserToken();
  }, [userToken, dispatch]);

  useEffect(() => {
    if (!dataLoad) {
      dispatch(refreshUserDatas());
    }
    setIsClient(true);
  }, [dataLoad, dispatch]);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsCheckTrue(false);
  };

  return (
    <div className="rightBloc">
      {screenSize > 1200 ? (
        <div className="blocConnected">
          <Link href="/about">À propos</Link>
          {isCheckTrue ? (
            <>
              <Link href="/rediger">Rédiger</Link>
              <Link href="/" onClick={handleLogout}>
                Déconnexion
              </Link>
            </>
          ) : (
            <Link className="simulate-bloc" href="/connexion">
              Connexion
            </Link>
          )}
        </div>
      ) : (
        <div>
          {isOpenMenu ? (
            <div className="overlay_shadow_menu">
              <div
                onClick={() => setIsOpenMenu(false)}
                className="responsive_menu_CLOSE"
              >
                <div className="cross_menu cross_menu_1"></div>
                <div className="cross_menu cross_menu_2"></div>
              </div>
              <div className="background_menu">
                <div className="blocConnected">
                  <Link onClick={() => setIsOpenMenu(false)} href="/">
                    Page d&apos;accueil
                  </Link>
                  <Link onClick={() => setIsOpenMenu(false)} href="/articles">
                    Articles
                  </Link>
                  <Link onClick={() => setIsOpenMenu(false)} href="/about">
                    À propos
                  </Link>
                  {isCheckTrue ? (
                    <>
                      <Link
                        onClick={() => setIsOpenMenu(false)}
                        href="/rediger"
                      >
                        Rédiger
                      </Link>
                      <Link href="/" onClick={handleLogout}>
                        Déconnexion
                      </Link>
                    </>
                  ) : (
                    <Link
                      onClick={() => setIsOpenMenu(false)}
                      href="/connexion"
                    >
                      Connexion
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setIsOpenMenu(true)}
              className="responsive_menu_OPEN"
            >
              <div className="bar_menu"></div>
              <div className="bar_menu"></div>
              <div className="bar_menu"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
