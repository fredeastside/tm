import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import EmployeeProjectsList from '../components/EmployeeProjectsList'
import EditableDate from '../components/EditableDate'
import EditableText from '../components/EditableText'
import { changeEmployeeProjectField, changeEmployeeField } from '../actions/employees'

class EmployeeDetails extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        employees: PropTypes.object.isRequired,
        projects: PropTypes.object.isRequired,
        changeEmployeeField: PropTypes.func.isRequired,
        changeEmployeeProjectField: PropTypes.func.isRequired
    };

    render() {
        const { id, employees, projects, changeEmployeeProjectField } = this.props
        const employee = employees.getIn(['entities', id])
        return (
        <div className="details-block">
            <table>
                <tbody>
                <tr>
                    <td>Name: </td>
                    <td><EditableText text = {employee.get('name')} save = {this.handleSave('name')}/></td>
                </tr>
                <tr>
                    <td>Email: </td>
                    <td><EditableText text = {employee.get('email')} save = {this.handleSave('email')}/></td>
                </tr>
                <tr>
                    <td>Projects:</td>
                    <td>
                        <EmployeeProjectsList employee = {employee} projects = {projects} changeField = {changeEmployeeProjectField} />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        )
    }

    handleSave = field => value => {
        this.props.changeEmployeeField(this.props.id, field, value)
    }
}

export default connect(state => {
    const { employees, projects } = state
    return { employees, projects }
}, {
    changeEmployeeField, changeEmployeeProjectField
})(EmployeeDetails)