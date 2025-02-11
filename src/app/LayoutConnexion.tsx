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
	const [screenSize, setScreenSize] = useState(1600);
	const [isCheckTrue, setIsCheckTrue] = useState(false);

	useEffect(() => {
		const check = async (userToken: string) => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check`, {
					method: "GET",
					headers: {
						Authorization: `Bearer ${userToken}`,
						"Content-Type": "application/json",
					},
				});

				if (res.status === 200) {
					setIsCheckTrue(true);
				}

				if (res.status === 401) {
					dispatch(logout());
					setIsCheckTrue(false);
				}
			} catch {
				return Error;
			}
		};
		if (userToken) {
			check(userToken);
		}
	}, []);

	useEffect(() => {
		if (dataLoad === false) {
			dispatch(() => refreshUserDatas());
			window.location.reload();
		}
		setIsClient(true);
	}, [dataLoad, dispatch, setIsClient]);

	const handleMenu = (action: boolean) => {
		setIsOpenMenu(action);
	};

	useEffect(() => {
		setScreenSize(window.innerWidth);
		const handleResize = () => {
			setScreenSize(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="rightBloc">
			{screenSize > 1200 ? (
				<div>
					{
						/* (isClient && userToken == null ) && */ isCheckTrue === false ? (
							<div className="blocConnected">
								<Link href={"/about"}>À propos</Link>
								<Link className="simulate-bloc" href={"/connexion"}>
									Connexion
								</Link>
							</div>
						) : (
							<div className="blocConnected">
								<Link href={"/about"}>À propos</Link>
								<Link href={"/rediger"}>Rédiger</Link>
								<Link href="/" onClick={() => dispatch(logout())}>
									Deconnexion
								</Link>
							</div>
						)
					}
				</div>
			) : (
				<div>
					{isOpenMenu ? (
						<div className="overlay_shadow_menu">
							<div onClick={() => handleMenu(false)} className="responsive_menu_CLOSE">
								<div className="cross_menu cross_menu_1"></div>
								<div className="cross_menu cross_menu_2"></div>
							</div>
							<div className="background_menu">
								{isClient && userToken == null ? (
									<div className="blocConnected">
										<Link onClick={() => handleMenu(false)} href={"/"}>
											Page d&apos;accueil
										</Link>
										<Link onClick={() => handleMenu(false)} href={"/articles"}>
											Articles
										</Link>
										<Link onClick={() => handleMenu(false)} href={"/about"}>
											À propos
										</Link>
										<Link onClick={() => handleMenu(false)} href={"/connexion"}>
											Connexion
										</Link>
									</div>
								) : (
									<div className="blocConnected">
										<Link onClick={() => handleMenu(false)} href={"/"}>
											Page d&apos;accueil
										</Link>
										<Link onClick={() => handleMenu(false)} href={"/articles"}>
											Articles
										</Link>
										<Link onClick={() => handleMenu(false)} href={"/about"}>
											À propos
										</Link>
										<Link onClick={() => handleMenu(false)} href={"/rediger"}>
											Rédiger
										</Link>
										<Link
											href="/"
											onClick={() => {
												dispatch(logout());
												handleMenu(false);
											}}
										>
											Deconnexion
										</Link>
									</div>
								)}
							</div>
						</div>
					) : (
						<div onClick={() => handleMenu(true)} className="responsive_menu_OPEN">
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
