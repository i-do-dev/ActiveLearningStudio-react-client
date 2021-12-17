/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from 'store/actionTypes';
import { uploadImage, createOrganizationNew, checkBranding, updateOrganization, getsubOrgList, getOrganization } from 'store/actions/organization';
import { removeActiveAdminForm } from 'store/actions/admin';
import imgAvatar from 'assets/images/default-upload-img.png';
import pcIcon from 'assets/images/pc-icon.png';
import Swal from 'sweetalert2';
import loader from 'assets/images/dotsloader.gif';
import EditActivity from 'containers/EditActivity';
import { alphabetsOnly } from 'utils';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CreateOrg(prop) {
  const { editMode } = prop;
  const [imageActive, setImgActive] = useState(null);
  const { paginations } = useSelector((state) => state.ui);
  const [activityImage, setActivityImage] = useState('');
  const imgUpload = useRef();
  const allListState = useSelector((state) => state.organization);
  const dispatch = useDispatch();
  const [loaderImg, setLoaderImg] = useState(false);
  const adminState = useSelector((state) => state.admin);
  const { activeForm, currentUser } = adminState;
  const { activeEdit, activeOrganization } = allListState;
  const [checkedActivity, setCheckedActivty] = useState(false);
  const [checkedPlaylist, setCheckedPlaylist] = useState(false);
  const [checkedProject, setCheckedProject] = useState(false);
  useEffect(() => {
    if (editMode) {
      setImgActive(activeEdit?.image);
      setCheckedActivty(activeEdit?.gcr_activity_visibility);
      setCheckedPlaylist(activeEdit?.gcr_playlist_visibility);
      setCheckedProject(activeEdit?.gcr_project_visibility);
    } else {
      setImgActive(null);
    }
  }, [editMode, activeEdit]);
  return (
    <div className="create-form">
      <Formik
        initialValues={{
          image: editMode ? activeEdit.image : '',
          name: editMode ? activeEdit?.name : '',
          description: editMode ? activeEdit?.description : '',
          domain: editMode ? activeEdit?.domain : '',
          account_id: editMode ? activeEdit?.account_id : undefined,
          api_key: editMode ? activeEdit?.api_key : undefined,
          unit_path: editMode ? activeEdit?.unit_path : undefined,
          self_registration: editMode ? activeEdit?.self_registration : false,
          noovo_client_id: editMode ? activeEdit?.noovo_client_id : undefined,
          gcr_project_visibility: editMode ? activeEdit?.gcr_project_visibility : false,
          gcr_playlist_visibility: editMode ? activeEdit?.gcr_playlist_visibility : false,
          gcr_activity_visibility: editMode ? activeEdit?.gcr_activity_visibility : false,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name || values.name.length > 255) {
            errors.name = values.name.length > 255 ? 'Length must be 255 characters or less.' : 'Required';
          }
          if (!values.description || values.description.length > 255) {
            errors.description = values.description.length > 255 ? 'Length must be 255 characters or less.' : 'Required';
          }
          if (!values.domain) {
            errors.domain = 'Required';
          } else if (values.domain?.length < 2 || values.domain?.length > 255) {
            errors.domain = 'Character limit should be greater than one and less than 255';
          }
          if (!values.image) {
            errors.image = 'Required';
          }

          return errors;
        }}
        onSubmit={async (values) => {
          Swal.fire({
            title: 'Please Wait !',
            html: editMode ? 'Updating Organization ... ' : 'Creating Organization ... ',
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });
          if (editMode) {
            const response = await dispatch(updateOrganization(activeEdit.id, values, activeEdit.parent ? activeEdit.parent.id : undefined));
            dispatch({
              type: actionTypes.ADD_CURRENT_ORG,
              payload: response?.suborganization,
            });
            if (response) {
              Swal.fire({
                text: 'Organization edited successfully',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#084892',
                confirmButtonText: 'OK',
              }).then(async (result) => {
                if (result.isConfirmed) {
                  dispatch(removeActiveAdminForm());
                }
              });
            }
          } else {
            Swal.fire({
              title: 'Activity',
              icon: 'info',
              text: 'Creating new organization...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const response = await dispatch(createOrganizationNew(activeOrganization.id, values));
            if (response) {
              Swal.fire({
                text: 'Organization added successfully',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#084892',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(removeActiveAdminForm());
                  dispatch(getsubOrgList(activeOrganization?.id));
                }
              });
            }
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setErrors,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <h2>{editMode ? 'Edit ' : 'Create '} Organization</h2>
            <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
            <div className="create-form-inputs-group">
              {/* Left container */}
              <div style={{marginRight:"64px"}}>
                <div className="form-group-create">
                  <h3>Organization Name</h3>
                  <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                  <div className="error">{errors.name && touched.name && errors.name}</div>
                </div>
                
                <div className="form-group-create">
                  <h3>Description</h3>
                  <textarea type="text" name="description" onChange={handleChange} onBlur={handleBlur} value={values.description} />
                  <div className="error">{errors.description && touched.description && errors.description}</div>
                </div>

                <div className="form-group-create">
                  <h3>Domain</h3>
                  <input
                    type="text"
                    name="domain"
                    autoComplete="off"
                    disabled={editMode ? true : false}
                    value={values.domain}
                    onChange={async (e) => {
                      if (alphabetsOnly(e.target.value) && !e.target.value.includes('@')) {
                        setFieldValue('domain', e.target?.value);
                        if (e.target.value.length > 1) {
                          setLoaderImg(true);
                          const result = dispatch(checkBranding(e.target.value));
                          result
                            .then((res) => {
                              console.log(res);
                              if (res.organization) {
                                setLoaderImg(false);
                                setErrors({ domain: '*Domian already in use' });
                              }
                            })
                            .catch((err) => {
                              if (err.errors) {
                                setLoaderImg(false);
                              }
                            });
                        }
                      }
                    }}
                    onBlur={handleBlur}
                  // value={values.admin}
                  />
                  <img src={loader} style={{ width: '25px', marginTop: '5px', visibility: loaderImg ? 'visible' : 'hidden' }} alt="" className="loader" />
                  <div className="error">{errors.domain && touched.domain && errors.domain}</div>
                </div>

                <div className="form-group-create">
                  <h3>LearnSafe Account ID</h3>
                  <input type="text" name="account_id" onChange={handleChange} onBlur={handleBlur} value={values.account_id} />
                </div>

                <div className="form-group-create">
                  <h3>LearnSafe API Key</h3>
                  <input type="text" name="api_key" onChange={handleChange} onBlur={handleBlur} value={values.api_key} />
                </div>

                <div className="form-group-create">
                  <h3>LearnSafe Unit Path </h3>
                  <input type="text" name="unit_path" onChange={handleChange} onBlur={handleBlur} value={values.unit_path} />
                </div>

                <div className="form-group-create">
                  <h3>Noovo Client ID </h3>
                  <input type="text" name="noovo_client_id" onChange={handleChange} onBlur={handleBlur} value={values.noovo_client_id} />
                </div>

                <div className="form-group-create">
                  <h3>Self Registration</h3>
                  <Switch
                    checked={values.self_registration}
                    onChange={() => {
                      setFieldValue('self_registration', !values.self_registration);
                    }}
                  />
                </div>

                <div className="toggle-group-button">
                  <div className="form-group-create">
                    <h3>Google Classroom Publishing</h3>
                    <div className="create-form-inputs-toggles">
                      <div className="custom-toggle-button">
                        <Switch
                          checked={values.gcr_project_visibility}
                          onChange={() => {
                            setCheckedProject(!checkedProject);
                            setFieldValue('gcr_project_visibility', !checkedProject);
                          }}
                          className="react-switch"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor="#888"
                          onColor="#ffca70"
                          onHandleColor="#e89e21"
                          offHandleColor="#666"
                        />
                        <h3>Project</h3>
                      </div>
                      {/* <Switch
                      checked={checked}
                      onChange={() => {
                        setChecked(!checked);
                        setFieldValue("published", !checked);
                      }}
                    /> */}
                      <div className="custom-toggle-button">
                        <Switch
                          checked={values.gcr_playlist_visibility}
                          onChange={() => {
                            setCheckedPlaylist(!checkedPlaylist);
                            setFieldValue('gcr_playlist_visibility', !checkedPlaylist);
                          }}
                          className="react-switch"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor="#888"
                          onColor="#ffca70"
                          onHandleColor="#e89e21"
                          offHandleColor="#666"
                        />
                        <h3>Playlist</h3>
                      </div>
                      <div className="custom-toggle-button">
                        <Switch
                          checked={values.gcr_activity_visibility}
                          onChange={() => {
                            setCheckedActivty(!checkedActivity);
                            setFieldValue('gcr_activity_visibility', !checkedActivity);
                          }}
                          className="react-switch"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor="#888"
                          onColor="#ffca70"
                          onHandleColor="#e89e21"
                          offHandleColor="#666"
                        />
                        <h3>Activity</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right container */}
              <div>
                <div className="form-group-create">
                <h3>Upload an image</h3>
                <div className="" onClick={() => imgUpload.current.click()}>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => {
                      if (
                        !(
                          e.target.files[0].type.includes('png') ||
                          e.target.files[0].type.includes('jpg') ||
                          e.target.files[0].type.includes('gif') ||
                          e.target.files[0].type.includes('jpeg') ||
                          e.target.files[0].type.includes('svg')
                        )
                      ) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Invalid file selected.',
                        });
                      } else if (e.target.files[0].size > 100000000) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Selected file size should be less then 100MB.',
                        });
                      } else {
                        const formData = new FormData();
                        try {
                          formData.append('thumb', e.target.files[0]);
                          const imgurl = dispatch(uploadImage(allListState.currentOrganization?.id, formData));
                          imgurl.then((img) => {
                            setImgActive(img.data?.thumbUrl);
                            setFieldValue('image', img.data?.thumbUrl);
                          });
                        } catch (err) {
                          Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Image upload failed, kindly try again.',
                          });
                        }
                      }
                    }}
                    onBlur={handleBlur}
                    ref={imgUpload}
                    style={{ display: 'none' }}
                  />
                  {imageActive ? (
                    <>
                      <img
                        src={`${global.config.resourceUrl}${imageActive}`}
                        style={{
                          width: '360px',
                          height: '215px',
                          borderRadius: '8px',
                        }}
                      />
                      <span className="upload-btn">
                        <img src={pcIcon} alt="" />
                        My device
                      </span>
                    </>
                  ) : (
                    <>
                      <img src={imgAvatar} alt="" />
                      <span className="upload-btn">
                      <img src={pcIcon} alt="" />
                        My device
                      </span>
                    </>
                  )}
                  <div className="error">{errors.image && touched.image && errors.image}</div>
                </div>
                </div>
              </div>
            </div>
            
            
            
            <div className="button-group">
              <button type="submit">{editMode ? 'Edit ' : 'Create '} Organization</button>
              <button
                type="button"
                className="cancel"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

CreateOrg.propTypes = {};
