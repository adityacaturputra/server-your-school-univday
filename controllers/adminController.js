const Category = require('../models/Category');
const Bank = require('../models/Bank');
const Item = require('../models/Item');
const Image = require('../models/Image');
const Feature = require('../models/Feature');
const Activity = require('../models/Activity');
const Users = require('../models/Users');
const Booking = require('../models/Booking');
const Member = require('../models/Member');
const mongoose = require('mongoose');
const fs = require('fs-extra');
const path = require('path');
const bcrypt = require('bcryptjs');
const ObjectId = mongoose.Types.ObjectId;

const University = require('../models/University')
const Content = require('../models/Content')


module.exports = {
    viewSignin: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus }
            if(req.session.user == null || req.session.user == undefined) {
                res.render('index', {alert, title: "Staycation | Login" })
            }else {
                res.redirect('/admin/dashboard')
            }
        } catch (error) {
            console.log(error)
            res.redirect('/admin/signin')
        }
    },
    actionSignin: async (req, res) => {
        try {
            const {username, password} = req.body
            const user = await Users.findOne({username})
            if(!user) {
                req.flash('alertMessage', 'username doesnt exist')
                req.flash('alertStatus', 'danger')
                res.redirect('/admin/signin')
                return
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                req.flash('alertMessage', 'wrong password')
                req.flash('alertStatus', 'danger')
                res.redirect('/admin/signin')
                return
            }
            req.session.user = {
                id: user.id,
                username: user.username
            }
            res.redirect('/admin/dashboard')
        } catch (error) {
            req.flash(`alertMessage', 'something goes wrong: ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/signin')
        }
    },
    actionLogout: (req, res) => {
        req.session.destroy()
        res.redirect('/admin/signin')
    },
    viewDashboard: async (req, res) => {
        try {
            const universities = await University.find()
            const contents = await Content.find()
            res.render('admin/dashboard/view_dashboard', { title: "univday | Dashboard", universities, contents, user: req.session.user })
        } catch (error) {
            res.redirect('/admin/dashboard')
        }
    },
    viewUniversity: async (req, res) => {
        try {
            const university = await University.find()
                .populate({ path: 'imageId', select: 'id imageUrl' })
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus }
            res.render('admin/University/view_university', { title: "univday | University", alert, university, user: req.session.user })
        } catch (error) {
            req.flash('alertMessage', `Failed: ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/dashboard')
        }
    },
    addUniversity: async (req, res) => {
        try {
            const { name } = req.body
            if (req.file) {
                const savedImage = await Image.create({imageUrl: `images/${req.file.filename}`})
                await University.create({ name, imageId: savedImage._id })
                req.flash('alertMessage', 'Success add University')
                req.flash('alertStatus', 'success')
                res.redirect('/admin/university')
                return
            }
            req.flash('alertMessage', 'failed add University, please insert image')
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/university')
            
        } catch (error) {
            console.log(error)
            req.flash('alertMessage', `Failed: ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/university')
        }
    },
    editUniversity: async (req, res) => {
        try {
            const { id, name } = req.body;
            const university = await University.findOne({ _id: id })
            if (req.file) {
                const deletedImage = await Image.findOne({_id: university.imageId})
                await fs.unlink(path.join(`public/${deletedImage.imageUrl}`))
                const savedImage = await Image.create({imageUrl: `images/${req.file.filename}`})
                university.imageId = savedImage._id
            }
            university.name = name
            await university.save()
            req.flash('alertMessage', 'Success update university')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/university')
        } catch (error) {
            req.flash('alertMessage', `Failed update university: ${error.message}`)
            req.flash('alertStatus', 'danger')
            console.log(error)
            res.redirect('/admin/university')
        }
    },
    deleteUniversity: async (req, res) => {
        try {
            const { id } = req.params;
            const university = await University.findOne({ _id: id })
            await Content.remove({universityId: university._id})
            const image = await Image.findOne({ _id: university.imageId })
            await fs.unlink(path.join(`public/${image.imageUrl}`))
            await university.remove()
            await image.remove()
            req.flash('alertMessage', 'Success delete university')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/university')
        } catch (error) {
            req.flash('alertMessage', `Failed delete university: ${error.message}`)
            req.flash('alertStatus', 'danger')
            console.log(error)
            res.redirect('/admin/university')
        }
    },

    viewContent: async (req, res) => {
        try {
            const content = await Content.find().populate({path: 'universityId', select: '_id name'})
            const university = await University.find()
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus }
            res.render('admin/content/view_content', { title: "univday | Content", alert, action: 'view', content, university, user: req.session.user })
        } catch (error) {
            req.flash('alertMessage', `Failed: ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/dashboard')
        }
    },
    addContent: async (req, res) => {
        try {
            const { name, universityId, jeroanKonten } = req.body
            
            await Content.create({ name, universityId, jeroanKonten })
            req.flash('alertMessage', 'Success add Content')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/content')
            return
        } catch (error) {
            console.log(error)
            req.flash('alertMessage', `Failed: ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/content')
        }
    },
    viewEditContent: async (req, res) => {
        try {
            const {id} = req.params
            console.log(id)
            const content = await Content.findOne({_id:id}).populate({path: 'universityId', select: '_id name'})
            const university = await University.find()
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = { message: alertMessage, status: alertStatus }
            console.log(content)
            res.render('admin/content/view_content', { title: "univday | Content", alert, action: 'edit', content, university, user: req.session.user })
        } catch (error) {
            req.flash('alertMessage', `Failed: ${error.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/admin/dashboard')
        }
    },
    editContent: async (req, res) => {
        try {
            const { name, universityId, jeroanKonten } = req.body;
            const { id } = req.params
            const content = await Content.findOne({ _id: id })
            content.name = name
            content.universityId = universityId
            content.jeroanKonten = jeroanKonten
            await content.save()
            req.flash('alertMessage', 'Success update content')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/content')
        } catch (error) {
            req.flash('alertMessage', `Failed update content: ${error.message}`)
            req.flash('alertStatus', 'danger')
            console.log(error)
            res.redirect('/admin/content')
        }
    },
    deleteContent: async (req, res) => {
        try {
            const { id } = req.params;
            const content = await Content.findOne({ _id: id })
            await content.remove()
            req.flash('alertMessage', 'Success delete content')
            req.flash('alertStatus', 'success')
            res.redirect('/admin/content')
        } catch (error) {
            req.flash('alertMessage', `Failed delete content: ${error.message}`)
            req.flash('alertStatus', 'danger')
            console.log(error)
            res.redirect('/admin/content')
        }
    },
}