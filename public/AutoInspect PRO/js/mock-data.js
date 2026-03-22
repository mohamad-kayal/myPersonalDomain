/* ============================================
   AutoInspect Pro — Mock Data
   ============================================ */

const MOCK_DATA = {
  // --- Current User ---
  currentUser: {
    id: 'usr_001',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@premiumauto.com.au',
    role: 'admin',
    avatar: 'SM',
    dealership: 'Premium Auto Group'
  },

  // --- Users ---
  users: [
    { id: 'usr_001', name: 'Sarah Mitchell', email: 'sarah.mitchell@premiumauto.com.au', role: 'admin', avatar: 'SM', status: 'active', inspections: 0, lastActive: '2026-03-21' },
    { id: 'usr_002', name: 'James Cooper', email: 'james.cooper@premiumauto.com.au', role: 'inspector', avatar: 'JC', status: 'active', inspections: 147, lastActive: '2026-03-21' },
    { id: 'usr_003', name: 'Mike Thompson', email: 'mike.t@premiumauto.com.au', role: 'inspector', avatar: 'MT', status: 'active', inspections: 132, lastActive: '2026-03-21' },
    { id: 'usr_004', name: 'David Chen', email: 'david.chen@premiumauto.com.au', role: 'manager', avatar: 'DC', status: 'active', inspections: 0, lastActive: '2026-03-20' },
    { id: 'usr_005', name: 'Emily Watson', email: 'emily.w@premiumauto.com.au', role: 'inspector', avatar: 'EW', status: 'active', inspections: 98, lastActive: '2026-03-19' },
    { id: 'usr_006', name: 'Ryan Brooks', email: 'ryan.b@premiumauto.com.au', role: 'inspector', avatar: 'RB', status: 'inactive', inspections: 45, lastActive: '2026-02-15' }
  ],

  // --- Vehicles ---
  vehicles: [
    { id: 'veh_001', vin: '1HGCV1F34LA012345', make: 'Honda', model: 'Accord', year: 2024, trim: 'Sport', engine: '1.5L Turbo I4', transmission: 'CVT', driveType: 'FWD', bodyType: 'Sedan', color: 'Crystal Black Pearl', plate: 'ABC-123', odometer: 15420, inspectionCount: 3, lastInspected: '2026-03-21', ppsr: 'Clear' },
    { id: 'veh_002', vin: '5YJSA1E26MF123456', make: 'Tesla', model: 'Model S', year: 2023, trim: 'Long Range', engine: 'Dual Motor Electric', transmission: 'Single Speed', driveType: 'AWD', bodyType: 'Sedan', color: 'Pearl White', plate: 'EV-7890', odometer: 28300, inspectionCount: 2, lastInspected: '2026-03-20', ppsr: 'Clear' },
    { id: 'veh_003', vin: 'WBA3A5G59ENS12345', make: 'BMW', model: '320i', year: 2025, trim: 'M Sport', engine: '2.0L Turbo I4', transmission: '8-Speed Auto', driveType: 'RWD', bodyType: 'Sedan', color: 'Alpine White', plate: 'BMW-456', odometer: 8750, inspectionCount: 1, lastInspected: '2026-03-19', ppsr: 'Clear' },
    { id: 'veh_004', vin: 'JTDKN3DU5A0123456', make: 'Toyota', model: 'RAV4', year: 2024, trim: 'GXL Hybrid', engine: '2.5L Hybrid I4', transmission: 'eCVT', driveType: 'AWD', bodyType: 'SUV', color: 'Urban Khaki', plate: 'XYZ-789', odometer: 32100, inspectionCount: 4, lastInspected: '2026-03-18', ppsr: 'Clear' },
    { id: 'veh_005', vin: '1FTFW1E85MF123456', make: 'Ford', model: 'F-150', year: 2023, trim: 'XLT', engine: '3.5L EcoBoost V6', transmission: '10-Speed Auto', driveType: '4WD', bodyType: 'Truck', color: 'Iconic Silver', plate: 'TRK-321', odometer: 45200, inspectionCount: 3, lastInspected: '2026-03-17', ppsr: 'Encumbered' },
    { id: 'veh_006', vin: 'WVWZZZ3CZWE123456', make: 'Volkswagen', model: 'Golf', year: 2024, trim: 'R-Line', engine: '2.0L TSI I4', transmission: '7-Speed DSG', driveType: 'FWD', bodyType: 'Hatchback', color: 'Lapiz Blue', plate: 'VW-2024', odometer: 12800, inspectionCount: 1, lastInspected: '2026-03-16', ppsr: 'Clear' },
    { id: 'veh_007', vin: 'JN1TBNT30Z0123456', make: 'Nissan', model: 'X-Trail', year: 2025, trim: 'Ti', engine: '1.5L VC-Turbo I3', transmission: 'CVT', driveType: 'AWD', bodyType: 'SUV', color: 'Diamond Black', plate: 'NIS-007', odometer: 5400, inspectionCount: 1, lastInspected: '2026-03-15', ppsr: 'Clear' },
    { id: 'veh_008', vin: 'MALA841CAFM123456', make: 'Mazda', model: 'CX-5', year: 2024, trim: 'GT SP', engine: '2.5L Turbo I4', transmission: '6-Speed Auto', driveType: 'AWD', bodyType: 'SUV', color: 'Soul Red Crystal', plate: 'MZD-555', odometer: 19600, inspectionCount: 3, lastInspected: '2026-03-14', ppsr: 'Clear' }
  ],

  // --- Inspections ---
  inspections: [
    { id: 'insp_001', vehicleId: 'veh_001', inspectorId: 'usr_002', reviewerId: 'usr_004', templateId: 'tmpl_001', status: 'approved', startedAt: '2026-03-21T09:15:00', completedAt: '2026-03-21T09:38:00', grade: 'A', score: 92, passCount: 42, failCount: 2, advisoryCount: 3, totalItems: 48 },
    { id: 'insp_002', vehicleId: 'veh_002', inspectorId: 'usr_003', reviewerId: null, templateId: 'tmpl_001', status: 'pending_review', startedAt: '2026-03-20T14:20:00', completedAt: '2026-03-20T14:52:00', grade: 'B+', score: 85, passCount: 38, failCount: 4, advisoryCount: 5, totalItems: 48 },
    { id: 'insp_003', vehicleId: 'veh_003', inspectorId: 'usr_002', reviewerId: null, templateId: 'tmpl_001', status: 'in_progress', startedAt: '2026-03-21T11:00:00', completedAt: null, grade: null, score: null, passCount: 25, failCount: 1, advisoryCount: 2, totalItems: 48 },
    { id: 'insp_004', vehicleId: 'veh_004', inspectorId: 'usr_005', reviewerId: 'usr_004', templateId: 'tmpl_002', status: 'approved', startedAt: '2026-03-18T10:30:00', completedAt: '2026-03-18T11:05:00', grade: 'A-', score: 88, passCount: 40, failCount: 3, advisoryCount: 4, totalItems: 48 },
    { id: 'insp_005', vehicleId: 'veh_005', inspectorId: 'usr_003', reviewerId: 'usr_004', templateId: 'tmpl_003', status: 'approved', startedAt: '2026-03-17T08:45:00', completedAt: '2026-03-17T09:25:00', grade: 'C+', score: 68, passCount: 30, failCount: 8, advisoryCount: 6, totalItems: 48 },
    { id: 'insp_006', vehicleId: 'veh_006', inspectorId: 'usr_002', reviewerId: null, templateId: 'tmpl_001', status: 'pending_review', startedAt: '2026-03-16T13:10:00', completedAt: '2026-03-16T13:42:00', grade: 'A', score: 94, passCount: 44, failCount: 1, advisoryCount: 2, totalItems: 48 },
    { id: 'insp_007', vehicleId: 'veh_007', inspectorId: 'usr_005', reviewerId: null, templateId: 'tmpl_002', status: 'draft', startedAt: '2026-03-21T10:00:00', completedAt: null, grade: null, score: null, passCount: 0, failCount: 0, advisoryCount: 0, totalItems: 48 },
    { id: 'insp_008', vehicleId: 'veh_008', inspectorId: 'usr_003', reviewerId: 'usr_004', templateId: 'tmpl_002', status: 'approved', startedAt: '2026-03-14T09:00:00', completedAt: '2026-03-14T09:35:00', grade: 'B', score: 82, passCount: 36, failCount: 5, advisoryCount: 6, totalItems: 48 },
    { id: 'insp_009', vehicleId: 'veh_001', inspectorId: 'usr_002', reviewerId: 'usr_004', templateId: 'tmpl_001', status: 'approved', startedAt: '2026-02-10T11:00:00', completedAt: '2026-02-10T11:28:00', grade: 'B+', score: 86, passCount: 39, failCount: 3, advisoryCount: 5, totalItems: 48 },
    { id: 'insp_010', vehicleId: 'veh_001', inspectorId: 'usr_005', reviewerId: 'usr_004', templateId: 'tmpl_001', status: 'approved', startedAt: '2025-12-05T14:30:00', completedAt: '2025-12-05T15:02:00', grade: 'B', score: 80, passCount: 36, failCount: 5, advisoryCount: 6, totalItems: 48 },
    { id: 'insp_011', vehicleId: 'veh_004', inspectorId: 'usr_002', reviewerId: 'usr_004', templateId: 'tmpl_002', status: 'approved', startedAt: '2026-01-22T09:00:00', completedAt: '2026-01-22T09:32:00', grade: 'B+', score: 84, passCount: 38, failCount: 4, advisoryCount: 5, totalItems: 48 },
    { id: 'insp_012', vehicleId: 'veh_004', inspectorId: 'usr_003', reviewerId: 'usr_004', templateId: 'tmpl_002', status: 'approved', startedAt: '2025-10-15T10:15:00', completedAt: '2025-10-15T10:50:00', grade: 'B-', score: 76, passCount: 34, failCount: 6, advisoryCount: 7, totalItems: 48 },
    { id: 'insp_013', vehicleId: 'veh_002', inspectorId: 'usr_005', reviewerId: 'usr_004', templateId: 'tmpl_001', status: 'approved', startedAt: '2026-01-08T13:00:00', completedAt: '2026-01-08T13:30:00', grade: 'A-', score: 90, passCount: 41, failCount: 2, advisoryCount: 4, totalItems: 48 },
    { id: 'insp_014', vehicleId: 'veh_005', inspectorId: 'usr_002', reviewerId: 'usr_004', templateId: 'tmpl_003', status: 'approved', startedAt: '2025-11-20T08:30:00', completedAt: '2025-11-20T09:10:00', grade: 'C', score: 62, passCount: 28, failCount: 10, advisoryCount: 8, totalItems: 48 },
    { id: 'insp_015', vehicleId: 'veh_005', inspectorId: 'usr_003', reviewerId: 'usr_004', templateId: 'tmpl_003', status: 'approved', startedAt: '2025-08-12T09:45:00', completedAt: '2025-08-12T10:20:00', grade: 'B-', score: 74, passCount: 33, failCount: 7, advisoryCount: 7, totalItems: 48 },
    { id: 'insp_016', vehicleId: 'veh_008', inspectorId: 'usr_002', reviewerId: 'usr_004', templateId: 'tmpl_002', status: 'approved', startedAt: '2025-12-18T11:00:00', completedAt: '2025-12-18T11:38:00', grade: 'B+', score: 87, passCount: 40, failCount: 3, advisoryCount: 4, totalItems: 48 }
  ],

  // --- Damage Markers ---
  damageMarkers: [
    { id: 'dmg_001', inspectionId: 'insp_001', x: 35, y: 22, view: 'top', type: 'Scratch', severity: 'minor', notes: 'Light surface scratch on hood, 15cm long' },
    { id: 'dmg_002', inspectionId: 'insp_001', x: 80, y: 55, view: 'top', type: 'Dent', severity: 'moderate', notes: 'Small dent on right rear quarter panel' },
    { id: 'dmg_003', inspectionId: 'insp_002', x: 20, y: 40, view: 'top', type: 'Paint Defect', severity: 'minor', notes: 'Clear coat peeling on left front fender' },
    { id: 'dmg_004', inspectionId: 'insp_002', x: 50, y: 85, view: 'top', type: 'Crack', severity: 'major', notes: 'Cracked rear bumper, needs replacement' },
    { id: 'dmg_005', inspectionId: 'insp_002', x: 65, y: 15, view: 'top', type: 'Chip', severity: 'minor', notes: 'Stone chip on front bumper' },
    { id: 'dmg_006', inspectionId: 'insp_005', x: 15, y: 35, view: 'side', type: 'Rust', severity: 'major', notes: 'Significant rust on left rocker panel' },
    { id: 'dmg_007', inspectionId: 'insp_005', x: 75, y: 45, view: 'side', type: 'Dent', severity: 'moderate', notes: 'Dent on rear door panel' }
  ],

  // --- Checklist Templates ---
  checklistTemplates: [
    {
      id: 'tmpl_001',
      name: 'Standard Sedan Inspection',
      vehicleType: 'Sedan',
      isActive: true,
      lastEdited: '2026-03-10',
      usageCount: 156,
      sections: [
        {
          key: 'exterior',
          title: 'Exterior',
          icon: 'fa-car',
          items: [
            { key: 'paint_condition', label: 'Paint Condition', type: 'pass_fail_advisory', required: true },
            { key: 'body_panels', label: 'Body Panel Alignment', type: 'pass_fail_advisory', required: true },
            { key: 'windshield', label: 'Windshield Condition', type: 'pass_fail', required: true },
            { key: 'side_windows', label: 'Side Windows & Mirrors', type: 'pass_fail', required: true },
            { key: 'headlights', label: 'Headlights & Fog Lights', type: 'pass_fail', required: true },
            { key: 'taillights', label: 'Taillights & Indicators', type: 'pass_fail', required: true },
            { key: 'bumpers', label: 'Bumpers (Front & Rear)', type: 'pass_fail_advisory', required: true },
            { key: 'trim_molding', label: 'Trim & Mouldings', type: 'pass_fail_advisory', required: false }
          ]
        },
        {
          key: 'interior',
          title: 'Interior',
          icon: 'fa-couch',
          items: [
            { key: 'seats', label: 'Seats & Upholstery', type: 'pass_fail_advisory', required: true },
            { key: 'dashboard', label: 'Dashboard & Controls', type: 'pass_fail', required: true },
            { key: 'steering', label: 'Steering Wheel & Column', type: 'pass_fail', required: true },
            { key: 'infotainment', label: 'Infotainment System', type: 'pass_fail', required: true },
            { key: 'climate', label: 'Climate Control / AC', type: 'pass_fail', required: true },
            { key: 'carpet_floor', label: 'Carpet & Floor Mats', type: 'pass_fail_advisory', required: false },
            { key: 'headliner', label: 'Headliner Condition', type: 'pass_fail', required: false },
            { key: 'seatbelts', label: 'Seatbelts & Buckles', type: 'pass_fail', required: true }
          ]
        },
        {
          key: 'engine',
          title: 'Engine & Mechanical',
          icon: 'fa-gear',
          items: [
            { key: 'engine_start', label: 'Engine Start & Idle', type: 'pass_fail', required: true },
            { key: 'engine_noise', label: 'Abnormal Engine Noise', type: 'pass_fail_advisory', required: true },
            { key: 'oil_level', label: 'Oil Level & Condition', type: 'pass_fail', required: true },
            { key: 'coolant', label: 'Coolant Level & Leaks', type: 'pass_fail', required: true },
            { key: 'belts_hoses', label: 'Belts & Hoses', type: 'pass_fail_advisory', required: true },
            { key: 'battery', label: 'Battery Condition', type: 'pass_fail', required: true },
            { key: 'transmission', label: 'Transmission Operation', type: 'pass_fail', required: true },
            { key: 'exhaust', label: 'Exhaust System', type: 'pass_fail_advisory', required: false }
          ]
        },
        {
          key: 'brakes',
          title: 'Brakes & Suspension',
          icon: 'fa-compact-disc',
          items: [
            { key: 'brake_pads_front', label: 'Front Brake Pads', type: 'pass_fail', required: true },
            { key: 'brake_pads_rear', label: 'Rear Brake Pads', type: 'pass_fail', required: true },
            { key: 'brake_discs', label: 'Brake Discs/Rotors', type: 'pass_fail_advisory', required: true },
            { key: 'brake_fluid', label: 'Brake Fluid Level', type: 'pass_fail', required: true },
            { key: 'suspension_front', label: 'Front Suspension', type: 'pass_fail_advisory', required: true },
            { key: 'suspension_rear', label: 'Rear Suspension', type: 'pass_fail_advisory', required: true },
            { key: 'shocks', label: 'Shock Absorbers', type: 'pass_fail', required: true },
            { key: 'alignment', label: 'Wheel Alignment (Visual)', type: 'pass_fail_advisory', required: false }
          ]
        },
        {
          key: 'tyres',
          title: 'Tyres & Wheels',
          icon: 'fa-circle-dot',
          items: [
            { key: 'tyre_fl', label: 'Front Left Tyre', type: 'pass_fail', required: true },
            { key: 'tyre_fr', label: 'Front Right Tyre', type: 'pass_fail', required: true },
            { key: 'tyre_rl', label: 'Rear Left Tyre', type: 'pass_fail', required: true },
            { key: 'tyre_rr', label: 'Rear Right Tyre', type: 'pass_fail', required: true },
            { key: 'spare_tyre', label: 'Spare Tyre / Kit', type: 'pass_fail', required: false },
            { key: 'wheel_condition', label: 'Wheel/Rim Condition', type: 'pass_fail_advisory', required: true },
            { key: 'tyre_tread', label: 'Tread Depth (mm)', type: 'numeric', required: true },
            { key: 'tyre_pressure', label: 'Tyre Pressure (PSI)', type: 'numeric', required: false }
          ]
        },
        {
          key: 'electrical',
          title: 'Electrical Systems',
          icon: 'fa-bolt',
          items: [
            { key: 'power_windows', label: 'Power Windows', type: 'pass_fail', required: true },
            { key: 'central_locking', label: 'Central Locking', type: 'pass_fail', required: true },
            { key: 'horn', label: 'Horn', type: 'pass_fail', required: true },
            { key: 'wipers', label: 'Wipers & Washers', type: 'pass_fail', required: true },
            { key: 'warning_lights', label: 'Dashboard Warning Lights', type: 'pass_fail', required: true },
            { key: 'parking_sensors', label: 'Parking Sensors / Camera', type: 'pass_fail', required: false },
            { key: 'key_fob', label: 'Key Fob / Keyless Entry', type: 'pass_fail', required: true },
            { key: 'usb_charging', label: 'USB / Charging Ports', type: 'pass_fail', required: false }
          ]
        },
        {
          key: 'road_test',
          title: 'Road Test',
          icon: 'fa-road',
          items: [
            { key: 'acceleration', label: 'Acceleration Response', type: 'pass_fail_advisory', required: true },
            { key: 'braking_feel', label: 'Braking Feel', type: 'pass_fail_advisory', required: true },
            { key: 'transmission_shift', label: 'Transmission Shifting', type: 'pass_fail_advisory', required: true },
            { key: 'steering_response', label: 'Steering Response', type: 'pass_fail', required: true },
            { key: 'suspension_comfort', label: 'Suspension Comfort', type: 'pass_fail_advisory', required: true },
            { key: 'road_noise', label: 'Road Noise', type: 'pass_fail_advisory', required: true },
            { key: 'vibration', label: 'Vibration at Speed', type: 'pass_fail', required: true },
            { key: 'warning_lights_drive', label: 'Warning Lights During Operation', type: 'pass_fail', required: true }
          ]
        }
      ]
    },
    {
      id: 'tmpl_002',
      name: 'SUV / Crossover Inspection',
      vehicleType: 'SUV',
      isActive: true,
      lastEdited: '2026-03-08',
      usageCount: 89,
      sections: []
    },
    {
      id: 'tmpl_003',
      name: 'Truck / Utility Inspection',
      vehicleType: 'Truck',
      isActive: true,
      lastEdited: '2026-02-28',
      usageCount: 34,
      sections: []
    },
    {
      id: 'tmpl_004',
      name: 'Electric Vehicle Inspection',
      vehicleType: 'EV',
      isActive: true,
      lastEdited: '2026-03-01',
      usageCount: 12,
      sections: [
        {
          key: 'battery_charging',
          title: 'Battery & Charging',
          icon: 'fa-battery-full',
          items: [
            { key: 'battery_health', label: 'Battery Health Display', type: 'pass_fail', required: true },
            { key: 'charge_port', label: 'Charge Port Condition', type: 'pass_fail_advisory', required: true },
            { key: 'charging_cable', label: 'Charging Cable', type: 'pass_fail', required: true },
            { key: 'home_charging', label: 'Home Charging Capability', type: 'pass_fail', required: true },
            { key: 'dc_fast_charge', label: 'DC Fast Charge Compatibility', type: 'pass_fail', required: true },
            { key: 'charge_indicator', label: 'Charge Level Indicator', type: 'pass_fail', required: true },
            { key: 'range_accuracy', label: 'Range Estimate Accuracy', type: 'pass_fail_advisory', required: true },
            { key: 'aux_battery', label: '12V Auxiliary Battery', type: 'pass_fail', required: true }
          ]
        },
        {
          key: 'electric_drivetrain',
          title: 'Electric Drivetrain',
          icon: 'fa-bolt',
          items: [
            { key: 'motor_noise', label: 'Motor Noise', type: 'pass_fail_advisory', required: true },
            { key: 'regen_braking', label: 'Regenerative Braking', type: 'pass_fail', required: true },
            { key: 'drive_mode', label: 'Drive Mode Operation', type: 'pass_fail', required: true },
            { key: 'power_delivery', label: 'Power Delivery', type: 'pass_fail_advisory', required: true },
            { key: 'creep_function', label: 'Creep Function', type: 'pass_fail', required: true },
            { key: 'range_under_load', label: 'Range Under Load', type: 'pass_fail_advisory', required: true }
          ]
        },
        {
          key: 'thermal_management',
          title: 'Thermal Management',
          icon: 'fa-temperature-half',
          items: [
            { key: 'battery_cooling', label: 'Battery Cooling System', type: 'pass_fail', required: true },
            { key: 'cabin_preconditioning', label: 'Cabin Pre-conditioning', type: 'pass_fail', required: true },
            { key: 'heat_pump', label: 'Heat Pump Operation', type: 'pass_fail_advisory', required: true },
            { key: 'thermal_warnings', label: 'Thermal Warning Indicators', type: 'pass_fail', required: true }
          ]
        },
        {
          key: 'software_connectivity',
          title: 'Software & Connectivity',
          icon: 'fa-wifi',
          items: [
            { key: 'infotainment_version', label: 'Infotainment Version', type: 'pass_fail', required: true },
            { key: 'firmware_status', label: 'Firmware Update Status', type: 'pass_fail_advisory', required: true },
            { key: 'connected_services', label: 'Connected Services', type: 'pass_fail', required: true },
            { key: 'ota_updates', label: 'OTA Update Capability', type: 'pass_fail', required: true }
          ]
        },
        {
          key: 'ev_safety',
          title: 'EV Safety',
          icon: 'fa-shield-halved',
          items: [
            { key: 'hv_warning_labels', label: 'High-Voltage Warning Labels', type: 'pass_fail', required: true },
            { key: 'orange_cable', label: 'Orange Cable Integrity', type: 'pass_fail', required: true },
            { key: 'emergency_disconnect', label: 'Emergency Disconnect', type: 'pass_fail', required: true },
            { key: 'insulation_resistance', label: 'Insulation Resistance', type: 'pass_fail', required: true }
          ]
        },
        {
          key: 'exterior',
          title: 'Exterior',
          icon: 'fa-car',
          items: [
            { key: 'paint_condition', label: 'Paint Condition', type: 'pass_fail_advisory', required: true },
            { key: 'body_panels', label: 'Body Panel Alignment', type: 'pass_fail_advisory', required: true },
            { key: 'windshield', label: 'Windshield Condition', type: 'pass_fail', required: true },
            { key: 'side_windows', label: 'Side Windows & Mirrors', type: 'pass_fail', required: true },
            { key: 'headlights', label: 'Headlights & Fog Lights', type: 'pass_fail', required: true },
            { key: 'taillights', label: 'Taillights & Indicators', type: 'pass_fail', required: true },
            { key: 'bumpers', label: 'Bumpers (Front & Rear)', type: 'pass_fail_advisory', required: true },
            { key: 'trim_molding', label: 'Trim & Mouldings', type: 'pass_fail_advisory', required: false }
          ]
        },
        {
          key: 'interior',
          title: 'Interior',
          icon: 'fa-couch',
          items: [
            { key: 'seats', label: 'Seats & Upholstery', type: 'pass_fail_advisory', required: true },
            { key: 'dashboard', label: 'Dashboard & Controls', type: 'pass_fail', required: true },
            { key: 'steering', label: 'Steering Wheel & Column', type: 'pass_fail', required: true },
            { key: 'infotainment', label: 'Infotainment System', type: 'pass_fail', required: true },
            { key: 'climate', label: 'Climate Control / AC', type: 'pass_fail', required: true },
            { key: 'carpet_floor', label: 'Carpet & Floor Mats', type: 'pass_fail_advisory', required: false },
            { key: 'headliner', label: 'Headliner Condition', type: 'pass_fail', required: false },
            { key: 'seatbelts', label: 'Seatbelts & Buckles', type: 'pass_fail', required: true }
          ]
        },
        {
          key: 'brakes',
          title: 'Brakes & Suspension',
          icon: 'fa-compact-disc',
          items: [
            { key: 'brake_pads_front', label: 'Front Brake Pads', type: 'pass_fail', required: true },
            { key: 'brake_pads_rear', label: 'Rear Brake Pads', type: 'pass_fail', required: true },
            { key: 'brake_discs', label: 'Brake Discs/Rotors', type: 'pass_fail_advisory', required: true },
            { key: 'brake_fluid', label: 'Brake Fluid Level', type: 'pass_fail', required: true },
            { key: 'suspension_front', label: 'Front Suspension', type: 'pass_fail_advisory', required: true },
            { key: 'suspension_rear', label: 'Rear Suspension', type: 'pass_fail_advisory', required: true },
            { key: 'shocks', label: 'Shock Absorbers', type: 'pass_fail', required: true },
            { key: 'alignment', label: 'Wheel Alignment (Visual)', type: 'pass_fail_advisory', required: false }
          ]
        },
        {
          key: 'tyres',
          title: 'Tyres & Wheels',
          icon: 'fa-circle-dot',
          items: [
            { key: 'tyre_fl', label: 'Front Left Tyre', type: 'pass_fail', required: true },
            { key: 'tyre_fr', label: 'Front Right Tyre', type: 'pass_fail', required: true },
            { key: 'tyre_rl', label: 'Rear Left Tyre', type: 'pass_fail', required: true },
            { key: 'tyre_rr', label: 'Rear Right Tyre', type: 'pass_fail', required: true },
            { key: 'spare_tyre', label: 'Spare Tyre / Kit', type: 'pass_fail', required: false },
            { key: 'wheel_condition', label: 'Wheel/Rim Condition', type: 'pass_fail_advisory', required: true },
            { key: 'tyre_tread', label: 'Tread Depth (mm)', type: 'numeric', required: true },
            { key: 'tyre_pressure', label: 'Tyre Pressure (PSI)', type: 'numeric', required: false }
          ]
        },
        {
          key: 'electrical',
          title: 'Electrical Systems',
          icon: 'fa-bolt',
          items: [
            { key: 'power_windows', label: 'Power Windows', type: 'pass_fail', required: true },
            { key: 'central_locking', label: 'Central Locking', type: 'pass_fail', required: true },
            { key: 'horn', label: 'Horn', type: 'pass_fail', required: true },
            { key: 'wipers', label: 'Wipers & Washers', type: 'pass_fail', required: true },
            { key: 'warning_lights', label: 'Dashboard Warning Lights', type: 'pass_fail', required: true },
            { key: 'parking_sensors', label: 'Parking Sensors / Camera', type: 'pass_fail', required: false },
            { key: 'key_fob', label: 'Key Fob / Keyless Entry', type: 'pass_fail', required: true },
            { key: 'usb_charging', label: 'USB / Charging Ports', type: 'pass_fail', required: false }
          ]
        }
      ]
    }
  ],

  // --- OBD Snapshots ---
  obdSnapshots: {
    insp_001: {
      dtcCodes: [],
      parameters: { rpm: 750, coolantTemp: 92, batteryVoltage: 12.6, mileage: 15420 }
    },
    insp_002: {
      dtcCodes: [
        { code: 'P0171', description: 'System Too Lean (Bank 1)', severity: 'warning' },
        { code: 'P0455', description: 'Evaporative Emission System Leak (Large)', severity: 'warning' }
      ],
      parameters: { rpm: 780, coolantTemp: 88, batteryVoltage: 12.4, mileage: 28300 }
    },
    insp_005: {
      dtcCodes: [
        { code: 'P0300', description: 'Random/Multiple Cylinder Misfire Detected', severity: 'critical' },
        { code: 'P0420', description: 'Catalyst System Efficiency Below Threshold', severity: 'warning' },
        { code: 'P0128', description: 'Coolant Thermostat Below Regulating Temperature', severity: 'info' }
      ],
      parameters: { rpm: 820, coolantTemp: 78, batteryVoltage: 11.9, mileage: 45200 }
    }
  },

  // --- Activity Feed ---
  activities: [
    { id: 'act_001', type: 'completed', user: 'James Cooper', action: 'completed inspection for', target: '2024 Honda Accord', time: '25 min ago', icon: 'completed' },
    { id: 'act_002', type: 'created', user: 'Emily Watson', action: 'started new inspection for', target: '2025 Nissan X-Trail', time: '1 hour ago', icon: 'created' },
    { id: 'act_003', type: 'reviewed', user: 'David Chen', action: 'approved inspection for', target: '2024 Toyota RAV4', time: '3 hours ago', icon: 'reviewed' },
    { id: 'act_004', type: 'flagged', user: 'Mike Thompson', action: 'flagged issues on', target: '2023 Ford F-150', time: '5 hours ago', icon: 'flagged' },
    { id: 'act_005', type: 'completed', user: 'James Cooper', action: 'completed inspection for', target: '2024 VW Golf R-Line', time: 'Yesterday', icon: 'completed' },
    { id: 'act_006', type: 'created', user: 'Mike Thompson', action: 'started new inspection for', target: '2023 Tesla Model S', time: 'Yesterday', icon: 'created' }
  ],

  // --- Analytics Data ---
  analytics: {
    inspectionsPerDay: [
      { date: '03/15', count: 5 },
      { date: '03/16', count: 7 },
      { date: '03/17', count: 4 },
      { date: '03/18', count: 8 },
      { date: '03/19', count: 6 },
      { date: '03/20', count: 9 },
      { date: '03/21', count: 3 }
    ],
    avgCompletionTime: [
      { date: '03/15', minutes: 28 },
      { date: '03/16', minutes: 24 },
      { date: '03/17', minutes: 32 },
      { date: '03/18', minutes: 22 },
      { date: '03/19', minutes: 26 },
      { date: '03/20', minutes: 21 },
      { date: '03/21', minutes: 23 }
    ],
    gradeDistribution: {
      'A': 35,
      'B': 28,
      'C': 15,
      'D': 8,
      'F': 4
    },
    topDefects: [
      { name: 'Tyre Tread Wear', category: 'Tyres & Wheels', count: 34, percentage: 72 },
      { name: 'Brake Pad Wear', category: 'Brakes', count: 28, percentage: 59 },
      { name: 'Paint Scratches', category: 'Exterior', count: 25, percentage: 53 },
      { name: 'Windshield Chips', category: 'Exterior', count: 18, percentage: 38 },
      { name: 'AC Performance', category: 'Interior', count: 15, percentage: 32 },
      { name: 'Oil Condition', category: 'Engine', count: 12, percentage: 25 },
      { name: 'Suspension Noise', category: 'Brakes & Suspension', count: 10, percentage: 21 },
      { name: 'Battery Health', category: 'Electrical', count: 8, percentage: 17 }
    ],
    inspectorPerformance: [
      { id: 'usr_002', name: 'James Cooper', avatar: 'JC', total: 147, avgTime: 22, passRate: 91, thisWeek: 12 },
      { id: 'usr_003', name: 'Mike Thompson', avatar: 'MT', total: 132, avgTime: 26, passRate: 85, thisWeek: 9 },
      { id: 'usr_005', name: 'Emily Watson', avatar: 'EW', total: 98, avgTime: 24, passRate: 88, thisWeek: 7 }
    ],
    monthlyTrend: [
      { month: 'Oct', inspections: 120, passRate: 82 },
      { month: 'Nov', inspections: 145, passRate: 85 },
      { month: 'Dec', inspections: 98, passRate: 84 },
      { month: 'Jan', inspections: 165, passRate: 87 },
      { month: 'Feb', inspections: 178, passRate: 89 },
      { month: 'Mar', inspections: 142, passRate: 90 }
    ]
  },

  // --- Dealership Settings ---
  dealership: {
    name: 'Premium Auto Group',
    subdomain: 'premiumauto',
    phone: '(02) 9876 5432',
    email: 'service@premiumauto.com.au',
    address: '123 Automotive Drive, Sydney NSW 2000',
    primaryColor: '#1a56db',
    secondaryColor: '#0f172a',
    disclaimer: 'This inspection report is based on a visual and diagnostic assessment performed at the time of inspection. It does not constitute a warranty or guarantee of vehicle condition. Some faults may not be detectable without further disassembly or specialised testing.'
  },

  // --- Audit Log ---
  auditLog: [
    { id: 'audit_001', userId: 'usr_001', userName: 'Sarah Mitchell', action: 'login', entityType: 'user', entityId: 'usr_001', description: 'User logged in', timestamp: '2026-03-22T08:15:00', ipAddress: '203.45.67.89' },
    { id: 'audit_002', userId: 'usr_002', userName: 'James Cooper', action: 'create', entityType: 'inspection', entityId: 'insp_003', description: 'Started inspection for 2025 BMW 320i', timestamp: '2026-03-21T11:00:00', ipAddress: '203.45.67.91' },
    { id: 'audit_003', userId: 'usr_002', userName: 'James Cooper', action: 'update', entityType: 'inspection', entityId: 'insp_001', description: 'Completed inspection for 2024 Honda Accord', timestamp: '2026-03-21T09:38:00', ipAddress: '203.45.67.91' },
    { id: 'audit_004', userId: 'usr_004', userName: 'David Chen', action: 'approve', entityType: 'inspection', entityId: 'insp_001', description: 'Approved inspection for 2024 Honda Accord', timestamp: '2026-03-21T10:05:00', ipAddress: '203.45.67.93' },
    { id: 'audit_005', userId: 'usr_001', userName: 'Sarah Mitchell', action: 'update', entityType: 'template', entityId: 'tmpl_001', description: 'Updated Standard Sedan Inspection template', timestamp: '2026-03-20T16:30:00', ipAddress: '203.45.67.89' },
    { id: 'audit_006', userId: 'usr_003', userName: 'Mike Thompson', action: 'create', entityType: 'inspection', entityId: 'insp_002', description: 'Started inspection for 2023 Tesla Model S', timestamp: '2026-03-20T14:20:00', ipAddress: '203.45.67.95' },
    { id: 'audit_007', userId: 'usr_001', userName: 'Sarah Mitchell', action: 'update', entityType: 'settings', entityId: 'dealership', description: 'Updated dealership contact information', timestamp: '2026-03-19T09:45:00', ipAddress: '203.45.67.89' },
    { id: 'audit_008', userId: 'usr_001', userName: 'Sarah Mitchell', action: 'create', entityType: 'user', entityId: 'usr_006', description: 'Invited new user Ryan Brooks', timestamp: '2026-03-18T14:00:00', ipAddress: '203.45.67.89' },
    { id: 'audit_009', userId: 'usr_004', userName: 'David Chen', action: 'approve', entityType: 'inspection', entityId: 'insp_005', description: 'Approved inspection for 2023 Ford F-150', timestamp: '2026-03-17T10:30:00', ipAddress: '203.45.67.93' },
    { id: 'audit_010', userId: 'usr_001', userName: 'Sarah Mitchell', action: 'delete', entityType: 'vehicle', entityId: 'veh_old_001', description: 'Removed archived vehicle 2018 Toyota Camry', timestamp: '2026-03-16T11:20:00', ipAddress: '203.45.67.89' }
  ],

  // --- Notifications ---
  notifications: [
    { id: 'notif_001', userId: 'usr_001', type: 'inspection_completed', title: 'Inspection Completed', message: 'James Cooper completed inspection for 2024 Honda Accord', entityType: 'inspection', entityId: 'insp_001', readAt: '2026-03-21T10:00:00', createdAt: '2026-03-21T09:38:00' },
    { id: 'notif_002', userId: 'usr_001', type: 'inspection_approved', title: 'Inspection Approved', message: 'David Chen approved inspection for 2024 Honda Accord', entityType: 'inspection', entityId: 'insp_001', readAt: '2026-03-21T10:30:00', createdAt: '2026-03-21T10:05:00' },
    { id: 'notif_003', userId: 'usr_001', type: 'critical_defect', title: 'Critical Defect Found', message: 'Mike Thompson flagged critical issues on 2023 Ford F-150: cylinder misfire detected', entityType: 'inspection', entityId: 'insp_005', readAt: '2026-03-17T12:00:00', createdAt: '2026-03-17T09:25:00' },
    { id: 'notif_004', userId: 'usr_001', type: 'inspection_completed', title: 'Inspection Completed', message: 'Mike Thompson completed inspection for 2023 Tesla Model S', entityType: 'inspection', entityId: 'insp_002', readAt: null, createdAt: '2026-03-20T14:52:00' },
    { id: 'notif_005', userId: 'usr_001', type: 'report_viewed', title: 'Report Viewed', message: 'Customer viewed report for 2024 Toyota RAV4 (insp_004)', entityType: 'inspection', entityId: 'insp_004', readAt: null, createdAt: '2026-03-21T15:30:00' },
    { id: 'notif_006', userId: 'usr_001', type: 'user_invited', title: 'User Invitation Accepted', message: 'Ryan Brooks accepted the invitation and joined the team', entityType: 'user', entityId: 'usr_006', readAt: '2026-03-19T08:00:00', createdAt: '2026-03-18T16:45:00' },
    { id: 'notif_007', userId: 'usr_001', type: 'system', title: 'System Maintenance', message: 'Scheduled maintenance window on March 25, 2026 from 2:00 AM to 4:00 AM AEST', entityType: null, entityId: null, readAt: null, createdAt: '2026-03-22T07:00:00' },
    { id: 'notif_008', userId: 'usr_001', type: 'inspection_completed', title: 'Inspection Completed', message: 'James Cooper completed inspection for 2024 VW Golf R-Line', entityType: 'inspection', entityId: 'insp_006', readAt: null, createdAt: '2026-03-16T13:42:00' }
  ]
};

// Helper functions for data access
function getVehicleById(id) {
  return MOCK_DATA.vehicles.find(v => v.id === id);
}

function getInspectionById(id) {
  return MOCK_DATA.inspections.find(i => i.id === id);
}

function getUserById(id) {
  return MOCK_DATA.users.find(u => u.id === id);
}

function getInspectionsForVehicle(vehicleId) {
  return MOCK_DATA.inspections.filter(i => i.vehicleId === vehicleId);
}

function getVehicleForInspection(inspectionId) {
  const inspection = getInspectionById(inspectionId);
  return inspection ? getVehicleById(inspection.vehicleId) : null;
}

function getInspectorForInspection(inspectionId) {
  const inspection = getInspectionById(inspectionId);
  return inspection ? getUserById(inspection.inspectorId) : null;
}

function getDamageMarkersForInspection(inspectionId) {
  return MOCK_DATA.damageMarkers.filter(d => d.inspectionId === inspectionId);
}

function getStatusLabel(status) {
  const labels = {
    'draft': 'Draft',
    'in_progress': 'In Progress',
    'pending_review': 'Pending Review',
    'approved': 'Approved',
    'archived': 'Archived'
  };
  return labels[status] || status;
}

function getStatusBadgeClass(status) {
  const classes = {
    'draft': 'badge-gray',
    'in_progress': 'badge-info',
    'pending_review': 'badge-warning',
    'approved': 'badge-success',
    'archived': 'badge-gray'
  };
  return classes[status] || 'badge-gray';
}

function getGradeColor(grade) {
  if (!grade) return 'var(--color-gray-400)';
  if (grade.startsWith('A')) return 'var(--color-success)';
  if (grade.startsWith('B')) return 'var(--color-primary)';
  if (grade.startsWith('C')) return 'var(--color-accent)';
  return 'var(--color-danger)';
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function formatDuration(startStr, endStr) {
  if (!startStr || !endStr) return '—';
  const start = new Date(startStr);
  const end = new Date(endStr);
  const mins = Math.round((end - start) / 60000);
  return `${mins} min`;
}

function getAvatarColor(name) {
  const colors = ['blue', 'green', 'amber', 'red', 'gray'];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
}
