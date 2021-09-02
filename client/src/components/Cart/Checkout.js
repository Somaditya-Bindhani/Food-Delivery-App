import React, { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isMobile = (value) => value.trim().length === 10;

const Checkout = (props) => {
  const [formInputsValidity, setInputValidity] = useState({
    name: true,
    address: true,
    postal: true,
    mobile: true,
  });

  const nameRef = useRef();
  const addressRef = useRef();
  const postalRef = useRef();
  const mobileRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredAddress = addressRef.current.value;
    const postal = postalRef.current.value;
    const mobile = mobileRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredPostalIsValid = !isEmpty(postal);
    const enteredMobileIsValid = isMobile(mobile);

    setInputValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      postal: enteredPostalIsValid,
      mobile: enteredMobileIsValid,
    });

    const formValidity =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredPostalIsValid &&
      enteredMobileIsValid;

    if (!formValidity) {
      return;
    }

    const userData = {
      enteredName,
      enteredAddress,
      postal,
      mobile,
    };
    props.onConfirm(userData);
    
  };

  const nameControlClasses = `${styles.control} ${
    formInputsValidity.name ? "" : styles.invalid
  }`;
  const streetControlClasses = `${styles.control} ${
    formInputsValidity.address ? "" : styles.invalid
  }`;
  const postalCodeControlClasses = `${styles.control} ${
    formInputsValidity.postal ? "" : styles.invalid
  }`;
  const mobileControlClasses = `${styles.control} ${
    formInputsValidity.mobile ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef}></input>
        {!formInputsValidity.name && <p>Please Enter a Valid Name.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Address</label>
        <input type="text" id="street" ref={addressRef}></input>
        {!formInputsValidity.address && <p>Please Enter a Valid Address.</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef}></input>
        {!formInputsValidity.postal && <p>Please Enter a Valid Postal Code.</p>}
      </div>
      <div className={mobileControlClasses}>
        <label htmlFor="number">Contact Number</label>
        <input type="number" id="number" ref={mobileRef}></input>
        {!formInputsValidity.mobile && (
          <p>Please Enter a Valid Mobile Number(10 Digits).</p>
        )}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
