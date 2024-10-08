PGDMP      %                |         
   shoplaptop    16.2    16.2 t    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16390 
   shoplaptop    DATABASE     �   CREATE DATABASE shoplaptop WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE shoplaptop;
                postgres    false                        2615    66784    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            �           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    66785    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            �            1259    66944    attribute_values    TABLE     ^  CREATE TABLE public.attribute_values (
    id integer NOT NULL,
    attribute_id integer NOT NULL,
    value character varying(255) NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    name character varying(255) NOT NULL
);
 $   DROP TABLE public.attribute_values;
       public         heap    postgres    false    5            �            1259    66943    attribute_values_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attribute_values_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.attribute_values_id_seq;
       public          postgres    false    237    5            �           0    0    attribute_values_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.attribute_values_id_seq OWNED BY public.attribute_values.id;
          public          postgres    false    236            �            1259    66935 
   attributes    TABLE     5  CREATE TABLE public.attributes (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    value character varying(255) NOT NULL
);
    DROP TABLE public.attributes;
       public         heap    postgres    false    5            �            1259    66934    attributes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attributes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.attributes_id_seq;
       public          postgres    false    235    5            �           0    0    attributes_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.attributes_id_seq OWNED BY public.attributes.id;
          public          postgres    false    234            �            1259    66806    brands    TABLE     b   CREATE TABLE public.brands (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);
    DROP TABLE public.brands;
       public         heap    postgres    false    5            �            1259    66805    brands_id_seq    SEQUENCE     �   CREATE SEQUENCE public.brands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.brands_id_seq;
       public          postgres    false    5    219            �           0    0    brands_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.brands_id_seq OWNED BY public.brands.id;
          public          postgres    false    218            �            1259    66833 
   categories    TABLE     �   CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    image_url text NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false    5            �            1259    66832    categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          postgres    false    225    5            �           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public          postgres    false    224            �            1259    66959    category_attributes    TABLE     q   CREATE TABLE public.category_attributes (
    category_id integer NOT NULL,
    attribute_id integer NOT NULL
);
 '   DROP TABLE public.category_attributes;
       public         heap    postgres    false    5            �            1259    66873    order_details    TABLE     m  CREATE TABLE public.order_details (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    price integer NOT NULL,
    discount integer DEFAULT 0 NOT NULL,
    quantity integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);
 !   DROP TABLE public.order_details;
       public         heap    postgres    false    5            �            1259    66872    order_details_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.order_details_id_seq;
       public          postgres    false    5    233            �           0    0    order_details_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.order_details_id_seq OWNED BY public.order_details.id;
          public          postgres    false    232            �            1259    66862    orders    TABLE     �  CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    address_id integer NOT NULL,
    payment_method text NOT NULL,
    note text NOT NULL,
    status integer NOT NULL,
    total_price integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false    5            �            1259    66861    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    5    231            �           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    230            �            1259    66953    product_attributes    TABLE     �   CREATE TABLE public.product_attributes (
    id integer NOT NULL,
    product_id integer NOT NULL,
    attribute_value_id integer NOT NULL
);
 &   DROP TABLE public.product_attributes;
       public         heap    postgres    false    5            �            1259    66952    product_attributes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_attributes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.product_attributes_id_seq;
       public          postgres    false    5    239            �           0    0    product_attributes_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public.product_attributes_id_seq OWNED BY public.product_attributes.id;
          public          postgres    false    238            �            1259    66824    product_images    TABLE     ~   CREATE TABLE public.product_images (
    id integer NOT NULL,
    product_id integer NOT NULL,
    image_url text NOT NULL
);
 "   DROP TABLE public.product_images;
       public         heap    postgres    false    5            �            1259    66823    product_images_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.product_images_id_seq;
       public          postgres    false    5    223            �           0    0    product_images_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.product_images_id_seq OWNED BY public.product_images.id;
          public          postgres    false    222            �            1259    66813    products    TABLE     d  CREATE TABLE public.products (
    id integer NOT NULL,
    brand_id integer,
    category_id integer,
    slug character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    short_description text,
    description text NOT NULL,
    price integer NOT NULL,
    discount integer DEFAULT 0 NOT NULL,
    status integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    meta_description text,
    meta_keywords text,
    meta_title character varying(255),
    thumbnail character varying(255)
);
    DROP TABLE public.products;
       public         heap    postgres    false    5            �            1259    66812    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    221    5            �           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    220            �            1259    66842    reviews    TABLE     �   CREATE TABLE public.reviews (
    id integer NOT NULL,
    product_id integer NOT NULL,
    user_id integer NOT NULL,
    rating integer NOT NULL,
    images jsonb,
    comment text NOT NULL
);
    DROP TABLE public.reviews;
       public         heap    postgres    false    5            �            1259    66841    reviews_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.reviews_id_seq;
       public          postgres    false    227    5            �           0    0    reviews_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;
          public          postgres    false    226            �            1259    66851    user_address    TABLE     q  CREATE TABLE public.user_address (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    phone_number character varying(20) NOT NULL,
    status integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);
     DROP TABLE public.user_address;
       public         heap    postgres    false    5            �            1259    66850    user_address_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.user_address_id_seq;
       public          postgres    false    5    229            �           0    0    user_address_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.user_address_id_seq OWNED BY public.user_address.id;
          public          postgres    false    228            �            1259    66795    users    TABLE     S  CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role integer DEFAULT 0 NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    default_address_id integer
);
    DROP TABLE public.users;
       public         heap    postgres    false    5            �            1259    66794    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    5    217            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    216            �           2604    66947    attribute_values id    DEFAULT     z   ALTER TABLE ONLY public.attribute_values ALTER COLUMN id SET DEFAULT nextval('public.attribute_values_id_seq'::regclass);
 B   ALTER TABLE public.attribute_values ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    236    237            �           2604    66938    attributes id    DEFAULT     n   ALTER TABLE ONLY public.attributes ALTER COLUMN id SET DEFAULT nextval('public.attributes_id_seq'::regclass);
 <   ALTER TABLE public.attributes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    235    235            �           2604    66809 	   brands id    DEFAULT     f   ALTER TABLE ONLY public.brands ALTER COLUMN id SET DEFAULT nextval('public.brands_id_seq'::regclass);
 8   ALTER TABLE public.brands ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            �           2604    66836    categories id    DEFAULT     n   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    66876    order_details id    DEFAULT     t   ALTER TABLE ONLY public.order_details ALTER COLUMN id SET DEFAULT nextval('public.order_details_id_seq'::regclass);
 ?   ALTER TABLE public.order_details ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    233    233            �           2604    66865 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    231    231            �           2604    66956    product_attributes id    DEFAULT     ~   ALTER TABLE ONLY public.product_attributes ALTER COLUMN id SET DEFAULT nextval('public.product_attributes_id_seq'::regclass);
 D   ALTER TABLE public.product_attributes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    239    239            �           2604    66827    product_images id    DEFAULT     v   ALTER TABLE ONLY public.product_images ALTER COLUMN id SET DEFAULT nextval('public.product_images_id_seq'::regclass);
 @   ALTER TABLE public.product_images ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    66816    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    66845 
   reviews id    DEFAULT     h   ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);
 9   ALTER TABLE public.reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226    227            �           2604    66854    user_address id    DEFAULT     r   ALTER TABLE ONLY public.user_address ALTER COLUMN id SET DEFAULT nextval('public.user_address_id_seq'::regclass);
 >   ALTER TABLE public.user_address ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    229    228    229            �           2604    66798    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            i          0    66785    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    215   ��                 0    66944    attribute_values 
   TABLE DATA           a   COPY public.attribute_values (id, attribute_id, value, created_at, updated_at, name) FROM stdin;
    public          postgres    false    237   ē       }          0    66935 
   attributes 
   TABLE DATA           M   COPY public.attributes (id, name, created_at, updated_at, value) FROM stdin;
    public          postgres    false    235   S�       m          0    66806    brands 
   TABLE DATA           *   COPY public.brands (id, name) FROM stdin;
    public          postgres    false    219   ߔ       s          0    66833 
   categories 
   TABLE DATA           ?   COPY public.categories (id, name, slug, image_url) FROM stdin;
    public          postgres    false    225   ��       �          0    66959    category_attributes 
   TABLE DATA           H   COPY public.category_attributes (category_id, attribute_id) FROM stdin;
    public          postgres    false    240   /�       {          0    66873    order_details 
   TABLE DATA           t   COPY public.order_details (id, order_id, product_id, price, discount, quantity, created_at, updated_at) FROM stdin;
    public          postgres    false    233   L�       y          0    66862    orders 
   TABLE DATA           |   COPY public.orders (id, user_id, address_id, payment_method, note, status, total_price, created_at, updated_at) FROM stdin;
    public          postgres    false    231   i�       �          0    66953    product_attributes 
   TABLE DATA           P   COPY public.product_attributes (id, product_id, attribute_value_id) FROM stdin;
    public          postgres    false    239   ��       q          0    66824    product_images 
   TABLE DATA           C   COPY public.product_images (id, product_id, image_url) FROM stdin;
    public          postgres    false    223   ��       o          0    66813    products 
   TABLE DATA           �   COPY public.products (id, brand_id, category_id, slug, name, short_description, description, price, discount, status, created_at, updated_at, meta_description, meta_keywords, meta_title, thumbnail) FROM stdin;
    public          postgres    false    221   ��       u          0    66842    reviews 
   TABLE DATA           S   COPY public.reviews (id, product_id, user_id, rating, images, comment) FROM stdin;
    public          postgres    false    227   ��       w          0    66851    user_address 
   TABLE DATA           p   COPY public.user_address (id, user_id, name, address, phone_number, status, created_at, updated_at) FROM stdin;
    public          postgres    false    229   Ǻ       k          0    66795    users 
   TABLE DATA           l   COPY public.users (id, name, email, password, role, created_at, updated_at, default_address_id) FROM stdin;
    public          postgres    false    217   �       �           0    0    attribute_values_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.attribute_values_id_seq', 4, true);
          public          postgres    false    236            �           0    0    attributes_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.attributes_id_seq', 3, true);
          public          postgres    false    234            �           0    0    brands_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.brands_id_seq', 1, false);
          public          postgres    false    218            �           0    0    categories_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.categories_id_seq', 10, true);
          public          postgres    false    224            �           0    0    order_details_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.order_details_id_seq', 1, false);
          public          postgres    false    232            �           0    0    orders_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.orders_id_seq', 1, false);
          public          postgres    false    230            �           0    0    product_attributes_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.product_attributes_id_seq', 2, true);
          public          postgres    false    238            �           0    0    product_images_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.product_images_id_seq', 21, true);
          public          postgres    false    222            �           0    0    products_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.products_id_seq', 4, true);
          public          postgres    false    220            �           0    0    reviews_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);
          public          postgres    false    226            �           0    0    user_address_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.user_address_id_seq', 1, false);
          public          postgres    false    228            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    216            �           2606    66793 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    215            �           2606    66951 &   attribute_values attribute_values_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.attribute_values
    ADD CONSTRAINT attribute_values_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.attribute_values DROP CONSTRAINT attribute_values_pkey;
       public            postgres    false    237            �           2606    66942    attributes attributes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.attributes
    ADD CONSTRAINT attributes_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.attributes DROP CONSTRAINT attributes_pkey;
       public            postgres    false    235            �           2606    66811    brands brands_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.brands DROP CONSTRAINT brands_pkey;
       public            postgres    false    219            �           2606    66840    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    225            �           2606    66963 ,   category_attributes category_attributes_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.category_attributes
    ADD CONSTRAINT category_attributes_pkey PRIMARY KEY (category_id, attribute_id);
 V   ALTER TABLE ONLY public.category_attributes DROP CONSTRAINT category_attributes_pkey;
       public            postgres    false    240    240            �           2606    66879     order_details order_details_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.order_details DROP CONSTRAINT order_details_pkey;
       public            postgres    false    233            �           2606    66871    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    231            �           2606    66958 *   product_attributes product_attributes_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.product_attributes
    ADD CONSTRAINT product_attributes_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.product_attributes DROP CONSTRAINT product_attributes_pkey;
       public            postgres    false    239            �           2606    66831 "   product_images product_images_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.product_images DROP CONSTRAINT product_images_pkey;
       public            postgres    false    223            �           2606    66822    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    221            �           2606    66849    reviews reviews_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_pkey;
       public            postgres    false    227            �           2606    66860    user_address user_address_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.user_address
    ADD CONSTRAINT user_address_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.user_address DROP CONSTRAINT user_address_pkey;
       public            postgres    false    229            �           2606    66804    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    217            �           1259    67806    attribute_values_value_key    INDEX     _   CREATE UNIQUE INDEX attribute_values_value_key ON public.attribute_values USING btree (value);
 .   DROP INDEX public.attribute_values_value_key;
       public            postgres    false    237            �           1259    67807    attributes_value_key    INDEX     S   CREATE UNIQUE INDEX attributes_value_key ON public.attributes USING btree (value);
 (   DROP INDEX public.attributes_value_key;
       public            postgres    false    235            �           1259    66933    products_slug_key    INDEX     M   CREATE UNIQUE INDEX products_slug_key ON public.products USING btree (slug);
 %   DROP INDEX public.products_slug_key;
       public            postgres    false    221            �           1259    66880    users_email_key    INDEX     I   CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);
 #   DROP INDEX public.users_email_key;
       public            postgres    false    217            �           2606    66964 3   attribute_values attribute_values_attribute_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attribute_values
    ADD CONSTRAINT attribute_values_attribute_id_fkey FOREIGN KEY (attribute_id) REFERENCES public.attributes(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 ]   ALTER TABLE ONLY public.attribute_values DROP CONSTRAINT attribute_values_attribute_id_fkey;
       public          postgres    false    237    4802    235            �           2606    66984 9   category_attributes category_attributes_attribute_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.category_attributes
    ADD CONSTRAINT category_attributes_attribute_id_fkey FOREIGN KEY (attribute_id) REFERENCES public.attributes(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 c   ALTER TABLE ONLY public.category_attributes DROP CONSTRAINT category_attributes_attribute_id_fkey;
       public          postgres    false    240    4802    235            �           2606    66979 8   category_attributes category_attributes_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.category_attributes
    ADD CONSTRAINT category_attributes_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 b   ALTER TABLE ONLY public.category_attributes DROP CONSTRAINT category_attributes_category_id_fkey;
       public          postgres    false    4792    240    225            �           2606    66921 )   order_details order_details_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 S   ALTER TABLE ONLY public.order_details DROP CONSTRAINT order_details_order_id_fkey;
       public          postgres    false    4798    231    233            �           2606    66926 +   order_details order_details_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 U   ALTER TABLE ONLY public.order_details DROP CONSTRAINT order_details_product_id_fkey;
       public          postgres    false    4787    221    233            �           2606    66916    orders orders_address_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.user_address(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 G   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_address_id_fkey;
       public          postgres    false    231    229    4796            �           2606    66911    orders orders_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_user_id_fkey;
       public          postgres    false    231    217    4783            �           2606    66974 =   product_attributes product_attributes_attribute_value_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_attributes
    ADD CONSTRAINT product_attributes_attribute_value_id_fkey FOREIGN KEY (attribute_value_id) REFERENCES public.attribute_values(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 g   ALTER TABLE ONLY public.product_attributes DROP CONSTRAINT product_attributes_attribute_value_id_fkey;
       public          postgres    false    237    4805    239            �           2606    66969 5   product_attributes product_attributes_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_attributes
    ADD CONSTRAINT product_attributes_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 _   ALTER TABLE ONLY public.product_attributes DROP CONSTRAINT product_attributes_product_id_fkey;
       public          postgres    false    221    239    4787            �           2606    66896 -   product_images product_images_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 W   ALTER TABLE ONLY public.product_images DROP CONSTRAINT product_images_product_id_fkey;
       public          postgres    false    221    223    4787            �           2606    66886    products products_brand_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES public.brands(id) ON UPDATE CASCADE ON DELETE SET NULL;
 I   ALTER TABLE ONLY public.products DROP CONSTRAINT products_brand_id_fkey;
       public          postgres    false    219    221    4785            �           2606    66891 "   products products_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE SET NULL;
 L   ALTER TABLE ONLY public.products DROP CONSTRAINT products_category_id_fkey;
       public          postgres    false    225    221    4792            �           2606    66906    reviews reviews_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 I   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_product_id_fkey;
       public          postgres    false    221    4787    227            �           2606    66901    reviews reviews_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 F   ALTER TABLE ONLY public.reviews DROP CONSTRAINT reviews_user_id_fkey;
       public          postgres    false    4783    217    227            �           2606    66881 #   users users_default_address_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_default_address_id_fkey FOREIGN KEY (default_address_id) REFERENCES public.user_address(id) ON UPDATE CASCADE ON DELETE SET NULL;
 M   ALTER TABLE ONLY public.users DROP CONSTRAINT users_default_address_id_fkey;
       public          postgres    false    217    4796    229            i   �  x�}�[nIE��U����"�O/"+ �^�1���������B��,���K��;&�A����P`�+V��aFm8FWc�]Qe-4�]IV�	���Kp kL���4u4��H�ZA������L����Z�_����3N�����X���.�����.�pg`}/�E,��&(Ѧd�a�!�p��H0�:�2Dw�@e�S�@��6����.y|N������+��||/����)#\9t�
�Blۣa+�oC�f?| �>���}P�1[B�W��#�jO����T-����tk�E�$�88I���u���)n$����˕J�J���⑏S£+���w��0�l�B��K�A�����R���j�Q��P�im~�EC�@ Չ�s�Z�����'�q:�ބqm�
�z�D�Z�#Z�vv��"��A[ӛq��F2Qgmք5Z:�EL4^��	Og�Ծ���r�����ԟ���-��r�W�U;�/>v/�S�ޅ.�L�3�zЕM��+Ӵ�I�-������^	2�|7A\ �&S����6�+6��q:�y��Ӻ)C�� W�i�
Z����ˋ�Ώz�.������rժ�SD&d9eq�a)Y�9:eP�Fږ��y�c�w%:��:���}��o&ʵ�sy-�}d���0�s�m�<wS�a�1[U����-3^�R��)a��1�f��A&Rہ������Q�w�Td���3���s<}�`�孉������ݿm�            x�u�11���|�&פi�cAL�,�b`������[-[f`8�wI���؆98Gbr.�|�
��/�%�-�?\)y��n���}��~�b�FZ���̽}���Й����,��p8��D����1�      }   |   x�3��8�8/�����D��B��L��������H����xRQb^
�gPb.�#+CC=KK��E��\Ɯ!Ew-�KW(�8�0E�����������9������������%gqIbIi1W� �-
      m      x������ � �      s   #  x���Kj1�ךS�=�G镝�"�LH�
�RI�������� �Yr�x��M"��] �RA��S�U���0���c?����nW�ۼ�g�;��y�I���2\�%��h�E�,�.J��,��>j,�ka�5ٛ�ط�n��Hk�UФ=�DZf��z@�SD�Uv^/�]?��/����=;`�����iH'����Rj�^/��x:�����Ch3Nw}Њ���	E^Z�%r	�U'BV b�:V9�9;�]�^�$�p�㜧헱� �Ʈ�N���5Zi�VԌ��|6@J�Vqp&"���b�fW7����&pm��,%�''3׎�h�NϦ���%�k��/./�O7��6�y��i��y3Hh�]�6\��H���(&-�>J��,^Z���MxX=�*X�H	R��S̤
�,��;?|���ï�eCC�z�E� ϵk����s���L�H��ʳ+<fFO�J���ӹ�^զQ����5��$�B�}8���_�����mfs�&5��Z��بJ�ٕ�GWGC�X~5/'Z������/RZ      �      x������ � �      {      x������ � �      y      x������ � �      �      x�3�4�4�2�F\1z\\\ 	      q   �  x����n�8E��IKJEͷ, P�d�M2i�v��f��^��a���sE^^��iw��_���/��֯ϻ׫^���hח �G!a���ew�L�۹?����4�D�JkY�Tɤ�A/����Z Hy��L��`�K��E�Þ��e�������>�a-�62⒛�i~�s�T�yq�] jM�6n][7ˌu��)`����yO�o#���u�������X{�F����*)ώxP0cE��y��0�{�"iˊT�L�)H�{Y�F�bz��=_O�������`����=�~n1�/;��VO�ݖ�������^lf��J�G���e��GT����Y�m�CZ ��H�����{DŪ��֛�yo}Vb.!�,V�����S��(�i%��y�[�ҰQZ�h���� �AXC��λ_��׺ ����j�6���=%7�L��	I5<pqw�c�k�e���S��$�z����@���'(�L��z5s47x/� ��0Ÿ�g�֘�(��@���{���Lz��cν.�i�~��ˍ1�����Xǒ�s����q}@���9^%��zݺ����x2����O���`����$�-����ss?�i:Π�a9>�d=)�0cLy�$=J���D��:�!i��'��)�i�8��^2+l�ta��@
���o#��&�H�����.���	דB���d���K�TL���������7���x      o      x��]{o�֕���wU��F�#��yHq�eIKV$�N���͐�#K�/��Al�ݢ��q��p7m�b	A��7�C�I��s/�Ki$�&Nk9tI����=�7ڕ_�]Ѯt�^�������bF�H��-��U��^U�߷��պq��M���K����M�u���Uٍ7�ҷ������G_wu��絉�ً���i�v?�����3ף8�6��~ri+�c%��;Ӻ�ۛ�y���C�emo�Y��b���1�71�����%�5��3�{�l耴h��g�M�aۉ_��nvLg����zm�^4=9�v�p�/[Aw�
:Ǌ���&��̻�n��%rBω&ff�(�#�^�4g���������Mo����=:| ��<{��O�8���G��QN��g������K�{t��p�w���_�O}�����g����SxMf��(f��!,��s�={ ��fmxq�̶p�{̇�y,::�����|��9:|l���O0ꃿ2��+1��YLa)�=2�`AI))�FT<�~,e����S&|t�xF�yw�?�����L�������}$���p��Up��!�̮C���~~쁼 |�c1�+��Л��W��T�w������E�1M�֍�j�\��O=����}�
�8~�(��E�z��P�ޮ��c���T�M��ݼ�Ӫ+���߼��ow��mo�Y3�^����R,FǏ'f~�3��z�&u��,E����K���d;G�Ȼ�����#���"+�Pb��q�y��y6h�fg�����ư��~�L�f�N�ڄ6�,��陶S~m��?�+,��N$#n��N;�������Z��U�,<
������xڴ��K�Mk�=�f?s���C����F8�*o�пWQ�+�ٟ� ]���#b��8�b_��|Gq����:�r����8��c�O��8H��tcrhO��ٱ;���?�g8�?WUzJvr"Y��S�rl\�f`倫��ͤ��e�k�Kҷ��=��[�b��`u��'�����cy���l%��ღi��cb�|%�����^#�0$�l�	c�2;� �[J7m�K�p�V���hj���a0`Ô������k~��$If&M���ݏL�өP׌s��j��?�� t���>e^U�*��.�X�F쪱�~Ό�kl�i:���vTb�0��a}P�3ʵ���%�(��:��s9�L�����#0�����14�JϚ�٘]ͱ[ʂ��������=�X���6�������}8��6o)+���׭'.	���6��~��t6��������G�����o��=�'~��k����K�(J���������9ëe�麡���4��g��;���f'��i�z�
�੒����8Up�ؚr�m*��J����]�h�aM`��y��z�����,��%�FZ��z-��VU��r	�k��� ��|*�+uԴ%���Φ�wV���̶M��Uؙ;��w/?Wi�rm��X^`W�)]��Ԇz���o�JU��8b�~�)�:%fT���mm΃�g�WK��/���:�V�::���;�⣤�ɠ�Ec�~g�z�;;g���ۛs��렎|����ϻY�߬_�f�fea� v5���3�m�`��jG-'��%��l��x0�}`Z�.3}�-xQ�c��-�B��q���X^X]������dM]�ч,���N̮n��bT/>��zn�;�u=+�P^̀�bĮV��n��愳�[���'�A~Z�>�3���s�.�'�J,l�ZcL�<����1Κ����,��,v�_x�ow��f6.!s����}�^|��T������W �ͮ./\c4��p�N��N��9_�uP�c~��~�����_n��Tu�SW��>m��z-����u�N�{������X�i��Wb���S۪����Mc�s��ٕ�>_���J�'{pO�E%r�q����*�q�������>����Q�U���_�[\ėnv�v4�}�3c�홞b���{�o�"E�]wu�Jt �ej���Sp�i\��]r�73ۡ;6��wJq�Vȫi:X�(�]s	�Q/l��Z���'}*b�.��m�A�eK���Z��O-�$�x/�a�T��5����Qn�o�ֵZ�Y�{r�'�	c������Kֆ��r*vF*�S���o띝�|�W�Y�?S�"�y3�>�xb���#��1��I��<�(W481��z%�d2���\���Ϭ��G0\�_�'���8���#�<閰�&���ŕ��ݸ����;�$���k�i����������~��K�X�I�-�y�;,���7��οR%��<fc�lnL��%��n`;!"b��^O���[9���|�D�أyҸ���?:����z�ʹܳ6�����3L�c��	��{t�?1�dH�t&�24�(�m��^1`���e�����F��jW�q�2e�m�n��pb(��Z��҇!��L��e�#,�}��>���F3�\�O�zb��;n���8�f��gv����-27<�#�n�����g����F<7B��ì������%T(0��b;��#��t�zeW��e�ⷩRW�[�u���@\n���W3��anq���f�����{,&	��\K͟�rs�G��=��Yť?��rR2��r�QAD�n����g7��6z���B뵉�ɖ�q�n�`dʾO�Xr��u��U�`Ie��ie{����Zu��*�i���N��nT�J�V�7�������?�o�@�����5h��ꠈf�����O�0i�/0���Y�բ��YF���3��\��f��lJj�&YG}t��)1�ҧ�Od-��q��#N/�f"�=d�?uQ:x��?�3K"��z���v�I�8��F��<�K2F���7 n��@��y�����"3*d�bJ+QS��Ʊ��h�$�3�=���kd�=�/��ٮHv��á��g1F)����	��d#�)��uɾ�����t��"�w�!����ٛG�������=a�wqa-1dK�w������یj��� ]#�r��)����I�V�]����*�WT����%��&�".W�|��(��9u�� /P�"Y����ޖs�t���&*.ҟ�\ӊ���$F��B��=9k�p���.i��.+�>\��%���޼�X���J��T{�[��H���ԙ����l��㦃��?�ZHGL
��~���jt�Kb����a6Z�J�6�����f�n�jj�Q�Y՚��c�nf�Ty'����a��B18@%m&�[���?|y��H\�/2/��N��a��M�˄t	���֛�41s�����}����n�ؐL��7������ƴ)�4�T�JE��K&0�Q*�`x��i�;���ӔR�@RH�
�����/	/�����ni-��Z-��Ԇ��tMu�M��j�>/oqg y��܆���%_�����gr�VB��;+bu����D�})+ʨ��D�O���cNQ���(6�ҝR�����Ȅ�=��Ps�1şZ%�[��IE1O�af*�H�)|C���|��r�^��]�2Ϸ����б�Un޲�fj�̂�cK���Ф/�\��ɚ�����N.#�L|m)R�=�m��,7��[^/����)�w}�xm{����=o�������p�p���"��5��xl ����("r��Z���%���^W)}�����')���N��,~?^�K7	[��l#�-�r��|	4Xe{��Z���T�Q7�n�t�b6-��n8�8��'35�	�d��%NԘBI��}��<2�˖��+�a��'f��zT���`-��sIeQ�H�����>	_�I��Xt�L>����,��IH���>�����[\���o������n�4���q��,N���@�`x
`��CA{����P�à��46I%�K����x_P�:Q�M�'��af�r��
B���9�F9�w�YK���9�>N�kBp�*w�*nm~�%:���s����ƒivUbQ5}-��x=4׮Y �  5��册J�1Q��Hs��]�$�8s?Κ��r%�V�.�n�cn��*�p�,���+��o�ȡ��ۘf��pg����F؋ b��r���?�6�=�c���_#�o��^�juS5�ZuS�����R5Go6��x)D)�M�%N[N�g����F��ćAj�1�&���e��I�]���PzeńK�ǔ�C��?,9��ɓ�|��]�gr1�1���-�@r�{N���	�_$��'���sJ"�Y�m�g�}��b�)��u�c)�sD}H�i�ˏ���&9��e#R��A�/{#��W�c[��>��uH�-�^q_��"vWvP���B�}<� 4{ps�{�]���^��[��^r%�y���]>��E)@X[��t_��j�i��u�l�-�i�͆�4Ô�a���W�����)��0㔣2�L�Tt�0h+�����VS���Z��*��T�^4�j��{K�Ö�[����aol�=w7��l� �)�f
���Ƒ�L6�?`3������L6�f�l� �)�f���
��l�'$��L6S��`3�L6S��`3�L6S��`3���
��K�t�̥^�l�/^6S��`3�L6S��`3�L6S��`3�L6S��`3��e��l� �)�f
��˫�
��l� �)�f
��l� �)�f
��l湀��jc~�	6�VO=.���~�g)m$φzu�P�j�)Q��W����r�-�,���bk���ڸ�	�]���Ud+��*O��͚QW����ҬH���-�m�î]s���������Q�fz_��������4(2�
Ҵ_
 �3�~���5[��73�����B��x.�#�0��VM6�-WWQi{m��;�������`9`�8ѳ�U���IU�[p��S�7WPg�Ij*�sx� &?��K=���@�=�&2! �^~iH����F�#%���d�:�V�M��~�*�
�.�U�FyH��n�yd�U*�s��&n�.�䥓����TNF�Hr��� T�ʮ��%>����T�h/*:���i5�U��*Y��pb��՛x�2�{`M��s؝�9p��簊N8R{�u��M�my!h[��s��c^r��Ae�V�i!���{*IH��N(����N�DQð�����]ܸ�n�#��K%!���G�H`��0��ݑ`j���r:(ڎo(������M��y8�W1�j�v�ᯥ��S�\"0J�����.����S+Ƈ�Ȼ�#�|�*S/��֍�����|Q#������~�[����ۍ���*�vUR����*[_�2�!f�҃��<g��1Cv.�{���D���O�n.�(K�#����ɀUQ5�N�"K�0������M�"��X�bv'�😷�ut��[[^9:������Ga`X	��C�iz�b;N�
��҉뺚�pB�q��܂�	?_Ԛ��2���>y�8w���nCc>�������� �`����no��n/7���҃�J�7ߏZ�3Pq�C?|�_?�n�U?#=���ǅ��&�Ċ��:1��ϓjy�NX�^��|\��6�m���w\��zN��ɬ�l+Ī���3T_{��� ��!C�9�U�R������4k��0�5P� P�\�>��,R�_���:/Xv4z�P/�bE�ڞ2ժS׍��c4�F�j�Zu
~۪���v;4}�ɕ&rx~��Ԭ��c8ё*:����X3vgc��2�kn��z��e��J��s�Ĵ�e,���iT֡:n�0�Sq�2Ou���aO���O��,-}�Uɢ�]�R�<���XX1H�E�y)���djb�:EԐ��$ƕ��l-�G��JE�8�!L7��B~W��]zY�؏�<����%׏2�a�>��^(@[N��!`!��A��Ȉ���Lv��q�M�3>�����.y�!@\?!n�����bT�bc��K��c�-�A�бr�k���.��Z��e�| �[�RlV .�3O�	��tU'.��uݨN)*ĝa�[Jˍ{�T���������ֵ�e�LӴ̚Q3���j8��e��)ө�e��G�&�=����Ab� =�`�G��TE��DF![@�'����=���)I'��f�,ojP�Pω����ax���R���k�C�$�f}��AI���m7!<¾��A���`O�U�&�/�����B��zV��uU �XIu�ж������K�!��ڠl��.i�U�K-v��l��A�H	)�����̄� �̤0<c9�Ǿ�+�xb%NB^��@P~X��9�`�%�O������U���H��B�#N�̮
7���sW2����b>����������s���<�zk~]��6v���/s��)��W"�-����!%��1D��pc����[�;���oշ��J��t*f�4�ٍZ��jSN����a~��]����Xo�h�&�_q���a��'@�J�,&Ma�]���34���I�X�kU�M�0�t�+$@���a_����V��( �	�o��p������r��c�D:����ȸh�?�R�ޘ>��/g-�C��	�|$��w��-�������-�����n�qYc���E�GN��b�=���9!Y8�Ӌ���O���u[��H��ų�nHû�z����:J�mW+�ZS�[�J���Sv��V�t��T-��~pl�*�Otc�:k�B�p,>��&��[r>�(��[��|�Rbk��홴�+�J��*��T{�d�/�X ����e� 9��r�)"�w��5�n��n��u���"Nn�x?ގkR/�C9Z�)Z�ٕ)�a>�ٕڱ�䊞�}}YOk�f-X
N<Q�i��.��T�3��8NJDx�B6�~j)m�5�s��%Rc	���/����"ۈ�E�d%�p2Q
zK���>�U�G4`��x��`���%v�/ŖW���6F��ˤ%�XI��>���q�$.�R��6��mS��v��T6���v�i�*uS7՚cت�lXvըZ�Z�4[U�dH;��m� r�lc�/�x�Q��\��M�J�����dT�� 3J��?d!ȗ�Ffl*�%d��[����Q���#�4�:湡}�Z0�s�emvm�izC�i�;at�7&h0Y�8�-	?^���LD"J������*4��/6XY������+q	�S��4�ȩg\��?�r�N�Q�Z��Z�DQ�h5c��q���|}�D:��y򽤥?�,F�n��?�b�u���ASS}b;����p�$�_�*{y�C���"3�i�����R>M�k
�AA�p���%��+�䍙�����{x�*��S�f��P��!�=�hn+���?��[��M���h�L$I�f�v��������{�j;Δ^3���l�V15��Y�Ӫ�.�^�7\aq��q��Q��e<I%�t_ȱ]9 @r��=x����8���yD_����==�{�D8}O����`����R�/t|���<5��j'oތvF���Q�P)V��X�����QP��ױM�U�V��0��TM�A*C1��ʡEcn�љCi6es�/���B�o9p�P8gS��_n��D+ir[�kI)�/Ln���1V���"29_����E�Q��)�/d�d㈯"��S��@���۩�ytaOs���������@+�)�#'�j۵Jծ�S:�.M�6U�U�f�PՊi6��������/������S�C��9�	�a~��%���/���ң�x��H��m����~	w��[{�=;]�ǈ�r�f;!��]�^�|�r�������Y���!���\Xݮ�v]�7����0j5ì�,���Ѭ:�i�³}`����lJ7��Z��w�l	�J~��~H`��*e(�����������������>j,0�*�!���Xe�iT|�j�;1AQDt���s(�dèO�C����d��ĉ�9pt"�$y�R�m��a�O��Z_
�Ͽo!�z��/|�+*�� �N�g����q%�%q��6�2�MvI^
Y��{4��S��Y�=�i�e؞_�_y��P۪      u      x������ � �      w      x������ � �      k   `   x�3�L-�,.˃R鹉�9z����&I��&&��FiƆ�)�I������i���&���FF&��Ff
�VFV�z��8�c��b���� n�     