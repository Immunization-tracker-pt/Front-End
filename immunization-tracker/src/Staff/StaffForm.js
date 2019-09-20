import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const StaffForm = (props) => {
	return (
		<Form>
			<Field />
		</Form>
	);
};

export default withFormik({
	mapPropsToValues : (props) => {
		return {
			name     : props.name || '',
			email    : props.email || '',
			password : props.password || '',
			service  : props.service || false,
		};
	},
})(StaffForm);
