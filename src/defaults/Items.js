export const equipmentOwnershipTypeDefault = {
  id: "",
  name: "",
  description: ""
}

export const equipmentStatusDefault = {
  id: "",
  name: ""
}

export const equipmentBookingStatusDefault = {
  id: "",
  name: "",
  description: "",
  color: "",
  defaultSetting: false
}

export const equipmentCategoryDefault = {
  id: "",
  name: "",
  description: ""
}

export const equipmentDefault = {
  id: 0,
  sortingId: 0,
  name: "",
  notes: "",
  width: 0,
  length: 0,
  height: 0,
  weight: 0,
  powerRequired: 0,
  staffNeeded: 0,
  minimumAge: 0,
  maxParticipants: 0,
  equipmentCategory: {
    id: 0
  },
  inUse: false,
  photos:[],
  equipmentStatus: {
    id: 0
  },
  bookingStatus: {
    id: 0
  },
  equipmentOwnership: {
    id: 0
  }
}

export const userCompactedDefault = {
  id: 0,
  login: "",
  firstName: "",
  lastName: ""
}


export const userDefault = {
  id: 0,
  login: "",
  password: "",
  firstName: "",
  lastName: "",
  contact: {
    id: "",
    email: "",
    phone: ""
  },
  userRoles: [{}]
}


export const userRoleDefault = {
  id: "",
  name: ""
}