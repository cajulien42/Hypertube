import React from 'react';

import classes from './SignIn.module.css';
import Input from '../../Utils/Input/Input';

const SignInDummy = (props) => {
	return (
		<div>
			<h3 id="SignIn" className={classes.signIn} style={{ display: props.Loading ? "none" : "block"}} onClick={props.signIn}>Sign-in</h3>
			<div className={classes.cont} style={{opacity: props.active ? "1" : "0"}}>
        {props.active ?
          <div className={classes.main} key={0}>
				  	<div className={classes.infosBlock}>
				  	  {props.infos.orderForm.map((elem, i) => {
				  	    return (
				  			<Input
				  				id={elem.id}
				  				key={i}
				  				elementType={elem.config.elementType}
				  				elementConfig={elem.config.elementConfig}
				  				value={elem.config.value || ""}
				  				invalid={!elem.config.valid}
				  				shouldValidate={elem.config.validation}
				  				touched={elem.config.touched}
				  				errorMessage={elem.config.errorMessage}
                  onChange={e => { props.inputChangedHandler(e, elem.id) }}
				  			/>
				  		)
				  	})}
				  	</div>
            {props.resetButton === true ?
              <div className={classes.resetDiv} id="resetDiv" key={1}>
                <div className={classes.infosBlock} >
                  {props.resetForm.orderForm.map((elem, i) => {
                    return (
                      <Input
                        id={elem.id}
                        key={i}
                        elementType={elem.config.elementType}
                        elementConfig={elem.config.elementConfig}
                        value={elem.config.value || ""}
                        invalid={!elem.config.valid}
                        shouldValidate={elem.config.validation}
                        touched={elem.config.touched}
                        errorMessage={elem.config.errorMessage}
                        onChange={e => { props.inputChangedHandler(e, elem.id) }}
                      />
                    )
                  })}
                </div>
              </div>
              : null
            }
				  	<div className={classes.buttonBox} id={"buttonBox"}>
              {props.error === false ?
                <button className={classes.resetButton} href='#' onClick={props.resetPwd} id='resetButton' >RESET PWD</button>
                : props.error === true ?
                <p className={classes.error}>Bad auth</p>
                : props.error === 'ERROR' ?
                <p className={classes.errorReset}>{props.error}</p>
                : props.error === 'MAIL SENT' ?
                <p className={classes.success}>{props.error}</p>
                : null
              }
				  		<button 
                className={classes.submitButton}
                id='submitButton'
				  			onClick={props.resetButton ? props.sendResetMail : props.submit}
				  			// disabled={props.resetButton === true ? !props.resetForm.formIsValid : !props.infos.formIsValid}
				  		>
				  			{props.resetButton ? 'SUBMIT' : 'ENTER'}
				  		</button>
				  	</div>
				  </div>
          : null
				}
			</div>
		</div>
	);
}

export default SignInDummy;
