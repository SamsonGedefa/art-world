import React, { useCallback, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./Login.module.css";
import { fetcher } from "@/lib/fetch";
import { useCurrentUser } from "@/lib/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const nameRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetcher("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailRef.current.value,
          name: nameRef.current.value,
          password: passwordRef.current.value,
          username: usernameRef.current.value,
        }),
      });

      console.log("Account is created");
      router.push("/");
    } catch (e) {
      toast.error(e.message, { autoClose: 1000 });
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <h1>Sign Up</h1>
        <form onSubmit={onSubmit}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="password">Your Password</label>
            <input type="password" id="password" required ref={passwordRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="username">Pick your Username</label>
            <input
              type="text"
              id="username"
              required
              ref={usernameRef}
              required
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required ref={nameRef} required />
          </div>
          <div className={styles.actions}>
            <button>Create Account</button>
          </div>
        </form>
      </div>
    </div>
  );
}
