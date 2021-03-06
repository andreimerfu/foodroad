import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { AddressCard } from './AddressCard';
import { ResErrors } from '../shared/form/ResErrors';

import * as actions from '../../actions';

class UserProfile extends React.Component {

  constructor() {
    super();
    this.changePassword = this.changePassword.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleNewPassword = this.handleNewPassword.bind(this);
    this.handleNewPasswordConfirmation = this.handleNewPasswordConfirmation.bind(this);
    this.addNewAddress = this.addNewAddress.bind(this);
     this.setState({
      address: "",
      tag: "",
      password: "",
      confirmation: ""
    });
  }

  componentWillMount() {
    this.props.dispatch(actions.getUserProfile());
  }

  renderAddresses(addresses) {
    return addresses.map((address, i) => {
      return(
        <AddressCard key={i} tag={address.tag} address={address.address}/>
      )
    })
  }

  handleAddressChange(e) {
    if (e) {
      this.setState({
        address: e.target.value
      });
    }
  }

  handleTagChange(e) {
    if (e) {
      this.setState({
        tag: e.target.value
      });
    }
  }

  handleNewPassword(e) {
    if (e) {
      this.setState({
        password: e.target.value
      });
    }
  }

  handleNewPasswordConfirmation(e) {
    if (e) {
      this.setState({
        confirmation: e.target.value
      });
    }
  }

  changePassword(e) {
    if (e && this.state.password === this.state.confirmation) {
      this.props.dispatch(actions.changePassword(this.state.password, this.state.confirmation));
    }
  }

  addNewAddress(e) {
    if (e) {
      this.props.dispatch(actions.addProfileAddress(this.state.address, this.state.tag));
    }
  }

  render() {
    const userProfile = this.props.userProfile.attributes;
    const {isAuth, errors } = this.props.auth;
    const role = localStorage.getItem('role');

    if (isAuth && role === 'user') {
      if (userProfile && Object.keys(userProfile).length > 0) {
        return (
          <section id="profile">
              <div class="wrap">
                <div class = "col pt-5">
                  <div class="col-lg-6 mb-5 mx-auto">
                    <div class="profile">
                      <div class="profile-header">
                        <h6 class="text-uppercase mb-0">Profil</h6>
                      </div>
                      <div class="profile-body">
                        <p>Schimba email-ul</p>
                        <form class="form">
                          <div class="form-group">
                            <label class="form-control-label text-uppercase mr-3">Email nou</label>
                            <input id="" type="password" placeholder="" class="mr-3 form-control"></input>
                          </div>
                          <div class="form-group">
                            <button class="btn btn-primary">Salveaza</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-5 mx-auto">
                    <div class="profile">
                      <div class="profile-header">
                        <h6 class="text-uppercase mb-0">Schimba parola</h6>
                      </div>
                      <ResErrors errors={errors} />
                      <div class="profile-body">
                        <form class="form">
                          <div class="form-group">
                            <label class="form-control-label text-uppercase mr-3">Parola noua</label>
                            <input id="inlineFormInput" type="password" placeholder="" class="mr-3 form-control" onChange={this.handleNewPassword}></input>
                          </div>
                          <div class="form-group">
                            <label class="form-control-label text-uppercase mr-3">Confirmare parola noua</label><label for="inlineFormInputGroup" class="sr-only">Username</label>
                            <input id="inlineFormInputGroup" type="password" placeholder="" class="mr-3 form-control" onChange={this.handleNewPasswordConfirmation}></input>
                          </div>
                          <div class="form-group">
                            <button class="btn btn-primary" onClick={this.changePassword} >Salveaza</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 mb-5 mx-auto">
                    <div class="profile">
                      <div class="profile-header">
                        <h6 class="text-uppercase mb-0">Adresa de livrare</h6>
                      </div>
                      <div class="profile-body">
                        {this.renderAddresses(userProfile.addresses)}
                        <button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary">Adauga o adresa de livrare </button>
                        <div id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
                          <div role="document" class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h4 id="exampleModalLabel" class="modal-title">Adauga o noua adresa</h4>
                                <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                              </div>
                              <div class="modal-body">
                                <p>Adauga o noua adresa de livrare contului tau.</p>
                                <form>
                                  <div class="form-group">
                                    <label class="form-control-label text-uppercase">Tag name</label>
                                    <input type="text" placeholder="Introduceti un tag name" onBlur={this.handleTagChange} class="form-control"></input>
                                    <label class="form-control-label text-uppercase">Adresa</label>
                                    <input type="text" placeholder="Introduceti adresa dumneavoastra" onBlur={this.handleAddressChange} class="form-control"></input>
                                  </div>
                                </form>
                              </div>
                              <div class="modal-footer">
                                <button type="button" data-dismiss="modal" class="btn btn-secondary">Close</button>
                                <button type="button" onClick={this.addNewAddress} class="btn btn-primary" data-dismiss="modal">Save changes</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </section>
        )
      } else {
        return(
          <p>Loading...</p>
        )
      }
    } else if(isAuth && role === 'restaurant') {
      return (
          <section id="profile">
              <div class="wrap">
                <div class = "col pt-5">

                  <div class="col-lg-6 mb-5 mx-auto">
                    <div class="profile">
                      <div class="profile-header">
                        <h6 class="text-uppercase mb-0">Change password</h6>
                      </div>
                      <ResErrors errors={errors} />
                      <div class="profile-body">
                        <p>Change your password.</p>
                        <form class="form">
                          <div class="form-group">
                            <label class="form-control-label text-uppercase mr-3">New password</label>
                            <input id="inlineFormInput" type="password" placeholder="" class="mr-3 form-control" onChange={this.handleNewPassword}></input>
                          </div>
                          <div class="form-group">
                            <label class="form-control-label text-uppercase mr-3">New Password confirmation</label><label for="inlineFormInputGroup" class="sr-only">Username</label>
                            <input id="inlineFormInputGroup" type="password" placeholder="" class="mr-3 form-control" onChange={this.handleNewPasswordConfirmation}></input>
                          </div>
                          <div class="form-group">
                            <button class="btn btn-primary" onClick={this.changePassword} >Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </section>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    auth : state.auth,
    userProfile: state.userProfile.data
  }
}

export default connect(mapStateToProps)(UserProfile)
