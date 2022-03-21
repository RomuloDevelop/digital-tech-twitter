import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik'; 
import Header from "../../components/LoginHeader";
import Card from "../../components/Card";
import './Login.scss';
import { RootState, store } from "../../store";
import { setActualUser, setUsers } from "../../store/user";
import { useSelector } from "react-redux";
import { selectUsers } from "../../store/user/selects";
import { FormEvent, useMemo, useRef, useState } from "react";
import FormButton from "../../components/Button";
import Input from "../../components/InputText";
import { setPosts } from "../../store/post";

interface LoginFields {username: string}

const Login = () => {
  let fileInput = useRef<HTMLInputElement | null>(null)
  const users = useSelector(selectUsers);
  let navigate = useNavigate();
  let [noExist, setExistance] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: ''
    },
    onSubmit: (values: LoginFields, { setSubmitting }: FormikHelpers<LoginFields>) => {
      const user = users.find(item => item.username === values.username)
      setTimeout(() => {
        setSubmitting(false);
        if (user) {
          setExistance(false)
          store.dispatch(setActualUser(user))
          navigate('/')
        } else {
          setExistance(true)
        }
      }, 1500);
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Debe ingresar el usuario'),
    })
  });

  const usernameError = useMemo(() =>
    !!(formik.touched.username && formik.errors.username),
    [formik.touched.username, formik.errors.username]
  )

  const handleFileChange = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const url = URL.createObjectURL(event.currentTarget.files[0])
      fetch(url)
        .then(response => response.json())
        .then(jsonResponse => {
          const data = jsonResponse as RootState
          if (data.userReducer) {
            store.dispatch(setUsers(data.userReducer.users))
          }

          if (data.postReducer) {
            store.dispatch(setPosts(data.postReducer))
          }
        }) 
    }
  }

  const addBatch = (event: any) => {
    event.preventDefault()
    fileInput?.current?.click()
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="header-wrapper">
          <Header></Header>
        </div>
        <Card>
          <>
          <h1 className="text-slate-500 login-title">Inicia sesión</h1>
          {noExist && <span className="login-error text-red-500">El usuario no existe</span>}
          <form className="flex direction-column" onSubmit={formik.handleSubmit}>
          <Input
              placeholder="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              error={usernameError}
              errorMessage={formik.errors.username}
            ></Input>

            <div className="login-redirect">
              <p className="text-center text-slate-500">
                <span className="mr-2">¿No tienes cuenta?</span>
                <Link to={'/register'}>Registrate</Link>
                <span> o </span>
                <button type="button" onClick={addBatch}
                  className="no-apperance text-purple-600">
                    Importa un archivo
                </button>
                <input ref={fileInput} value="" className='hidden' onChange={handleFileChange} type="file" accept="application/JSON" />
              </p>
              <div className="mt-4 flex justify-end">
                <FormButton loading={formik.isSubmitting} text="Entrar"/>
              </div>
            </div>
          </form>
          </>
        </Card>
      </div>
    </div>
    // <Link to="/home">Invoices</Link>
  )
}

export default Login