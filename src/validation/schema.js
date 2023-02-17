import * as Yup from 'yup';

export const UserSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is Require'),
  username: Yup.string()
    .required('User Name is Require'),
  mobile: Yup.string()
    .typeError("That doesn't look like a phone number")
    .min(10)
    .required('A phone number is required'),
  password: Yup.string()
    .required('Password is Require')
    .min(6),
  rolelabel: Yup.string()
    .required('Role Label is Require'),
  email: Yup.string().email('Invalid email').required('Email is Require'),
});

export const signupSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Name is Require'),
  email: Yup.string().email('Invalid email').required('Email is Require'),
  password: Yup.string()
    .required('Password is Require')
    .min(6),
  confirmPassword: Yup.string()
    .required('Password is Require')
    .min(6),
});

export const roleSchema = Yup.object().shape({
  roleLabel: Yup.string()
    .required('Role Label is Require'),
  roleKey: Yup.string()
    .required('Role Key is Require')
})

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email')
    .required('Email is Require'),
  password: Yup.string()
    .required('Password is Require')
})

