import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik'; 
import Header from "../../components/LoginHeader";
import Card from "../../components/Card";
import './Register.scss';
import { add, User } from "../../store/user";
import { useMemo } from "react";
import Input from "../../components/InputText";
import FormButton from "../../components/Button";
import { store } from "../../store";

type RegisterFields = Omit<User, 'id'>

const requiredMessage = (name: string) => `${name} es requerido`

const Register = () => {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      name: '',
      surname: ''
    },
    onSubmit: (values: RegisterFields, { setSubmitting }: FormikHelpers<RegisterFields>) => {
      setTimeout(() => {
        setSubmitting(false);
        store.dispatch(add(values))
        navigate('/login')
      }, 1500)
    },
    validationSchema: Yup.object({
      username: Yup.string().required(requiredMessage('Nombre de usuario')).min(3, 'Mínimo 3 carácteres').max(20, 'Máximo 20 carácteres'),
      name: Yup.string().required(requiredMessage('Nombre')).min(3, 'Mínimo 3 carácteres').max(20, 'Máximo 20 carácteres'),
      surname: Yup.string().required(requiredMessage('Apellido')).min(3, 'Mínimo 3 carácteres').max(20, 'Máximo 20 carácteres')
    })
  });

  const nameError = useMemo(() =>
    !!(formik.touched.name && formik.errors.name),
    [formik.touched.name, formik.errors.name]
  )

  const surnameError = useMemo(() =>
    !!(formik.touched.surname && formik.errors.surname),
    [formik.touched.surname, formik.errors.surname]
  )

  const usernameError = useMemo(() =>
    !!(formik.touched.username && formik.errors.username),
    [formik.touched.username, formik.errors.username]
  )

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="header-wrapper">
          <Header></Header>
        </div>
        <Card>
          <>
          <h1 className="text-slate-500 register-title">Regístrate</h1>
          <form className="flex direction-column" onSubmit={formik.handleSubmit}>
            <Input
              placeholder="Nombre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              error={nameError}
              errorMessage={formik.errors.username}
            ></Input>
            <Input
              placeholder="Apellido"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.surname}
              name="surname"
              error={surnameError}
              errorMessage={formik.errors.surname}
            ></Input>
            <Input
              placeholder="Nombre de usuario"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              name="username"
              error={usernameError}
              errorMessage={formik.errors.username}
            ></Input>
            <div className="mt-4 flex justify-end">
              <FormButton text="Enviar" loading={formik.isSubmitting} className="inline-flex justify-center"/>
            </div>
          </form>
          <div className="register-redirect">
            <p className="text-center"><span className="text-slate-500 mr-2">¿Ya tienes cuenta?</span>
              <Link to={'/login'}>Inicia sesión</Link>
            </p>
          </div>
          </>
        </Card>
      </div>
    </div>
    // <Link to="/home">Invoices</Link>
  )
}

export default Register