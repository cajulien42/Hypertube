import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RegisterDummy from './RegisterD';
const formDatas = require('./register.json');

const RegisterSmurt = (props) => {
	const [file, setFile] = useState(false);
	const [infos, setInfos] = useState({
		orderForm: formDatas,
		formIsValid: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const uploadImgToCloud = () => {
		let formData = new FormData();
    formData.append('image', file.file);
		axios.post('http://localhost:3000/API/photo', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
			.then((res) => {
        console.log(res);
        let newInfos = infos.orderForm;
        let newPhotoElem = newInfos.photo;
        newPhotoElem.config.value = res.data.url;
        newPhotoElem.config.touched = true;
        newPhotoElem.config.valid = true;
        newInfos.photo = newPhotoElem; 
        let formIsValid = true;
				// eslint-disable-next-line no-unused-vars
				for (let inputIdentifier in newInfos) {
					formIsValid = newInfos[inputIdentifier].config.valid && formIsValid;
        }
        setInfos({ orderForm: newInfos, formIsValid: formIsValid });
        setLoading(false);
      });
	};

	const handleImageChange = e => {
		e.preventDefault();
	
		if (e.target.files && e.target.files[0]) {
			let reader = new FileReader();
			setFile({ file: e.target.files[0], imagePreviewUrl: null });
			
			reader.onloadend = (e) => {
				setFile(prevState => {
					return ({
						file: prevState.file,
						imagePreviewUrl: e.target.result
					});
				});
			}
      reader.readAsDataURL(e.target.files[0]);
		}
	}

	useEffect(() => {
    console.log(file);
    if (file.imagePreviewUrl && file.imagePreviewUrl.includes('data:image/') === true) {
      console.log('Uploading image to cloud...');
      setLoading(true);
      uploadImgToCloud();
    }
  }, [file]);

	const checkValidity = (value, rules, inputIdentifier, state) => {
		return new Promise (function (resolve, reject) {
			let isValid = true;
			let errorMessages = [];

			if (!rules) {
				resolve(true);
			}
			if (rules.required === true) {
				isValid = (value.trim() !== "") && isValid;
				if (inputIdentifier !== undefined && value.trim() === "")
				{	
					errorMessages.push("This field is required");
					reject(errorMessages);
				}
			}
			if (!rules.required) {
				if ((value.trim() === "")) {
					resolve(true);
				}
			}
			if (rules.minLength) {
				isValid = (value.length >= rules.minLength) && isValid;
				if (inputIdentifier !== undefined && (value.length < rules.minLength))
				{	
					errorMessages.push("This field requires at least " + rules.minLength + " characters");
					reject(errorMessages);
				}
			}
			if (rules.maxLength) {
				isValid = (value.length <= rules.maxLength) && isValid;
				if (inputIdentifier !== undefined && (value.length > rules.maxLength))
				{	
					errorMessages.push("This field must not exceed " + rules.maxLength + " characters");
					reject(errorMessages);
				}
			}
			if (rules.regex) {
				isValid = RegExp(unescape(rules.regex), 'g').test(value) && isValid;
				if (inputIdentifier !== undefined && (RegExp(unescape(rules.regex), 'g').test(value) === false))
				{	
					errorMessages.push(rules.rule);
					reject(errorMessages);
				}
			}
			if(!rules.db && !rules.checkEmail) {
				resolve(isValid);
			}
			else {
				resolve(isValid);
			}
			// if (rules.checkEmail === true) {
			// 	if (state.emails.includes(value) === false) {
			// 		isValid = true && isValid;
			// 		resolve(isValid);
			// 	}
			// 	else if (state.emails.includes(value) === true) {
			// 		isValid = false;
			// 		errorMessages.push("This e-mail adress is already being used");
			// 		reject(errorMessages);
			// 	}
			// }
			// if (rules.db === true) {
			// 	if (state.users.includes(value) === false) {
			// 		isValid = true && isValid;
			// 		resolve(isValid);
			// 	}
			// 	else if (state.users.includes(value) === true) {
			// 		errorMessages.push("Username already taken");
			// 		reject(errorMessages);
			// 	}
			// }
		});
	}

	const inputChangedHandler = (e, inputIdentifier) => {
		const updatedOrderForm = {
			...infos.orderForm
    };
    const updatedFormElement = updatedOrderForm[inputIdentifier].config;
		updatedFormElement.value = e.target.value;
		checkValidity(updatedFormElement.value, updatedFormElement.validation, inputIdentifier, infos)
			.then((response) => {
				// console.log(response);
				updatedFormElement.valid = response;
				updatedFormElement.touched = true;
				updatedOrderForm[inputIdentifier].config = updatedFormElement;
				let formIsValid = true;
				// eslint-disable-next-line no-unused-vars
				for (let inputIdentifier in updatedOrderForm) {
					formIsValid = updatedOrderForm[inputIdentifier].config.valid && formIsValid;
        }
				setInfos({ orderForm: updatedOrderForm, formIsValid: formIsValid });
			})
			.catch((e) => {
				// console.log(e);
				updatedFormElement.valid = false;
				updatedFormElement.touched = true;
				updatedFormElement.errorMessage = e;
				updatedOrderForm[inputIdentifier].config = updatedFormElement;
				let formIsValid = true;
				// eslint-disable-next-line no-unused-vars
				for (let inputIdentifier in updatedOrderForm) {
					formIsValid = updatedOrderForm[inputIdentifier].config.valid && formIsValid;
				}
				setInfos({ orderForm: updatedOrderForm, formIsValid: formIsValid });
			});
	}

  useEffect(() => {
    console.log(infos);
  }, [infos])

	const submit = e => {
		e.preventDefault();
		console.log("submit() triggered");

    let newProfil = {};
		for (let identifier in infos.orderForm) {
      if (infos.orderForm[identifier].config.touched === true) {
        if (identifier === 'cPasswd' && infos.orderForm.password.config.value === infos.orderForm.cPasswd.config.value) {
          break ;
        }
        newProfil[identifier] = infos.orderForm[identifier].config.value;
      }
    }
		if (infos.orderForm.photo.config.value === '') {
			setInfos(prevState => {
				return { orderForm: prevState.orderForm, formIsValid: false };
			})
    }
    
    if (infos.formIsValid && infos.orderForm.photo.config.value !== '') {
      axios.post(`http://localhost:3000/API/users/`, newProfil)
        .then((res) => {
          console.log(res);
          let token = {"token": res.data.token};
          if (token !== null && res.data.success && res.data.username) {
            console.log(token);
            localStorage.setItem('JWT', JSON.stringify(token));
            localStorage.setItem('username', res.data.username);
            setInfos((prevState) => {
              let newOrderForm = prevState.orderForm;
              for (let identifier in formDatas) {
                newOrderForm[identifier].config.value = '';
              }
              return ({ orderForm: newOrderForm, formIsValid: false })
            });
            props.logIn();
          }
          else if (res.data.success === false) {
            setInfos((prevState) => {
              let newOrderForm = prevState.orderForm;
              newOrderForm.username.config.touched = false;
              return ({ orderForm: prevState.orderForm, formIsValid: false });
            })
            setError(res.data.payload);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  
  useEffect(() => {
    if (error && infos.orderForm.username.config.touched === true) {
      console.log('setError à false');
      setError(false);
    }
  }, [infos.orderForm.username.config.touched]);

	return (
		<RegisterDummy
			handleImageChange={handleImageChange}
			inputChangedHandler={inputChangedHandler}
			submit={submit}
			register={props.whichForm}
			infos={infos}
			active={props.formActive.register}
      file={file}
      loading={loading}
      error={error}
		/>
	)
}

export default RegisterSmurt;
