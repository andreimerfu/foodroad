import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import * as actions from '../../actions';

class UserProfile extends React.Component {

  constructor() {
    super()
  }
  componentWillMount() {
    this.props.dispatch(actions.getUserProfile());
  }

  render() {
    return (
      <section id="profile">
          <div class="container">
            <div class="row d-flex align-items-center pt-5">
              
              
              <div class="col-lg-6 mb-5">
                <div class="profile">
                  <div class="profile-header">
                    <h6 class="text-uppercase mb-0">Profilul meu</h6>
                  </div>
                  <div class="profile-body">
                    <p>.</p>
                    <form>
                      <div class="form-group">       
                        <label class="form-control-label text-uppercase">Email</label>
                        <input type="text" placeholder="Email" class="form-control"></input>
                      </div>
                      <div class="form-group">       
                        <label class="form-control-label text-uppercase">New Password</label>
                        <input type="password" placeholder="Password" class="form-control"></input>
                      </div>
                      <div class="form-group">       
                        <button type="submit" class="btn btn-primary shadow px-5 my-4">Log in</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div class="col-lg-6 mb-5">
                <div class="profile">
                  <div class="profile-header">
                    <h6 class="text-uppercase mb-0">Adresa de livrare</h6>
                  </div>
                  <div class="profile-body">
                    <p>Adresa curenta</p>
                        <button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-primary">Adauga o adresa de livrare </button>
                            <div id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" class="modal fade text-left">
                              <div role="document" class="modal-dialog">
                                <div class="modal-content">
                                  <div class="modal-header">
                                    <h4 id="exampleModalLabel" class="modal-title">Adauga o noua adresa</h4>
                                    <button type="button" data-dismiss="modal" aria-label="Close" class="close"><span aria-hidden="true">×</span></button>
                                  </div>
                                  <div class="modal-body">
                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                    <form>
                                      <div class="form-group">
                                        <label class="form-control-label text-uppercase">Adresa</label>
                                        <input type="text" placeholder="Email" class="form-control"></input>
                                      </div>
                                    </form>
                                  </div>
                                  <div class="modal-footer">
                                    <button type="button" data-dismiss="modal" class="btn btn-secondary">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                    </div>
                  </div>
                

                 

              <div class="col-lg-12 mb-5 ">
                <div class="profile">
                  <div class="profile-header">
                    <h6 class="text-uppercase mb-0">Parola</h6>
                  </div>
                  <div class="profile-body">
                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                     <form class="form-inline">
                      <div class="form-group">
                        <label class="form-control-label text-uppercase mr-3">Password</label>
                        <input id="inlineFormInput" type="password" placeholder="" class="mr-3 form-control"></input>
                      </div>
                      <div class="form-group">
                        <label class="form-control-label text-uppercase mr-3">New Password</label><label for="inlineFormInputGroup" class="sr-only">Username</label>
                        <input id="inlineFormInputGroup" type="password" placeholder="" class="mr-3 form-control"></input>
                      </div>
                      <div class="form-group">
                        <button type="submit" class="btn btn-primary">Submit</button>
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

function mapStateToProps(state) {
  return {
    profile: state.userProfile.data
  }
}

export default connect(mapStateToProps)(UserProfile)
