
import tw from 'twin.macro';

const Container = tw.div`min-h-full h-screen mx-auto flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`;
const Box = tw.div`2xl:w-1/3 lg:w-1/2 md:w-2/3 sm:w-3/4 w-4/5 space-y-8`;
const Header = tw.h2`mt-6 text-3xl font-extrabold text-gray-900`
const Form = tw.form`shadow overflow-hidden rounded-[20px] bg-white pt-3`;
const FormFooter = tw.div`px-4 py-3 bg-gray-50 text-right sm:px-6`;
const FormInputPanel = tw.div`px-6 py-2 bg-white  w-full`;
const FormInputLabel = tw.label`block text-sm font-medium text-gray-700`
const Input = tw.input`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`
const InputErrorMessage = tw.p`mt-2 text-pink-600 text-sm`


export { Container, Box, Header, Form, FormFooter, FormInputPanel, FormInputLabel, Input, InputErrorMessage }