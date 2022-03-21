import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik'; 
import Header from "../../components/LoginHeader";
import Card from "../../components/Card";
import './Login.scss';
import { store } from "../../store";
import { setActualUser } from "../../store/user";
import { useSelector } from "react-redux";
import { selectUsers } from "../../store/user/selects";
import { useMemo, useState } from "react";
import FormButton from "../../components/Button";
import Input from "../../components/InputText";

interface LoginFields {username: string}

const Login = () => {
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
            <div className="mt-4 flex justify-end">
              <FormButton loading={formik.isSubmitting} text="Entrar"/>
            </div>
          </form>
          <div className="login-redirect mt-3">
            <p className="text-center"><span className="text-slate-500 mr-2">¿No tienes cuenta?</span>
              <Link to={'/register'}>Registrate</Link>
            </p>
          </div>
          </>
        </Card>
      </div>
    </div>
    // <Link to="/home">Invoices</Link>
  )
}

export default Login