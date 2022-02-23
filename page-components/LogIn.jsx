import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import styles from "./Login.module.css";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      signIn("credentials", {
        redirect: false,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        callbackUrl: `${window.location.origin}`,
      }).then((response) => {
        if (response.error) {
          toast.error(response.error, { autoClose: 2000 });
          return;
        }
        if (response.ok) {
          setIsLoading(false);
          toast.success(response.ok);
          router.push("/");
        }
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // return loading component
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <h1>Login</h1>
        <form onSubmit={submit}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="password">Your Password</label>
            <input type="password" id="password" required ref={passwordRef} />
          </div>
          <div className={styles.actions}>
            <button>Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
}
