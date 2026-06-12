import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ModalShow = ({
  show,
  handleClose,
  editDoctor,
  setEditDoctor,
  handleSave,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Doctor Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="row">
            <div className="col">
              <label>Dept Code</label>
              <input
                className="m-3"
                type="number"
                name="deptCode"
                value={editDoctor?.deptCode || ""}
                placeholder="Dept Code"
                readOnly
              />
            </div>
            <div className="col">
              <label>Doctor Name</label>
              <input
                className="m-3"
                type="text"
                name="doctorName"
                value={editDoctor?.doctorName || ""}
                onChange={(e) =>
                  setEditDoctor({ ...editDoctor, doctorName: e.target.value })
                }
                placeholder="Doctor Name"
              />
            </div>
            <div className="col">
              <label>Dept Type</label>
              <input
                className="m-3"
                type="text"
                name="deptType"
                value={editDoctor?.deptType || ""}
                onChange={(e) =>
                  setEditDoctor({ ...editDoctor, deptType: e.target.value })
                }
                placeholder="Dept Type"
              />
            </div>
            <div className="col">
              <label>License No</label>
              <input
                className="m-3"
                type="number"
                name="licenseNo"
                value={editDoctor?.licenseNo || ""}
                onChange={(e) =>
                  setEditDoctor({ ...editDoctor, licenseNo: e.target.value })
                }
                placeholder="License No"
              />
            </div>
            <div className="col">
              <label>Profile Image</label>
              <input
                className="m-3"
                type="file"
                name="imagePath"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setEditDoctor({ ...editDoctor, imagePath: imageUrl });
                  }
                }}
              />
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalShow;
