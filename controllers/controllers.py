# -*- coding: utf-8 -*-
# from odoo import http


# class PosModi(http.Controller):
#     @http.route('/pos_modi/pos_modi/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/pos_modi/pos_modi/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('pos_modi.listing', {
#             'root': '/pos_modi/pos_modi',
#             'objects': http.request.env['pos_modi.pos_modi'].search([]),
#         })

#     @http.route('/pos_modi/pos_modi/objects/<model("pos_modi.pos_modi"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('pos_modi.object', {
#             'object': obj
#         })
