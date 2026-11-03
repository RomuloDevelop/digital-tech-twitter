import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import Card from "../../components/Card";
import { User } from "../../store/user";
import { useMemo, useState } from "react";
import Input from "../../components/InputText";
import FormButton from "../../components/Button";
import './UserData.scss';
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selects";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import AvatarSelector from "../AvatarSelector";

type UserDataProps = {onSubmit: Function}
type Fields = Omit<User, 'id'>

const requiredMessage = (name: string) => `${name} es requerido`

const UserData = (props: UserDataProps) => {
  const navigate = useNavigate()
  const actualUser = useSelector(selectUser) as User
  const [avatar, setAvatar] = useState(actualUser.avatar)
  const formik = useFormik({
    initialValues: {
      username: actualUser.username,
      name: actualUser.name,
      surname: actualUser.surname
    },
    onSubmit: (values: Fields, { setSubmitting }: FormikHelpers<Fields>) => {
      setTimeout(() => {
        setSubmitting(false);
        props.onSubmit({...values, avatar, id: actualUser.id})
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
    <div className="data-container">
      <div className="data-wrapper">
        <div className="w-full" style={{maxWidth: 500}}>
          <button onClick={() => navigate(-1)} className="mr-auto flex justify-start items-center gap-1 text-purple-700">
            <ChevronLeftIcon style={{width: '1rem'}}></ChevronLeftIcon>
            Volver
          </button>
        </div>
        <Card>
          <div className="flex flex-col">
            <h1 className="text-slate-500 data-title">Tus datos</h1>
            <div className="flex justify-center mb-4">
              <AvatarSelector value={avatar} onChange={(value) => setAvatar(value)}/>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <Input
                placeholder="Nombre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                name="name"
                error={nameError}
                errorMessage={formik.errors.name}
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
                <FormButton text="Actualizar" loading={formik.isSubmitting} className="inline-flex justify-center"/>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default UserData